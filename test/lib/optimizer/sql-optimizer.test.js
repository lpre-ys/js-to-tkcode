import assert from 'power-assert';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import esprima from 'esprima';
import escodegen from 'escodegen';
import _sqlite3pkg from 'sqlite3';
import SqlOptimizer from '../../../js/lib/optimizer/sql-optimizer.js';

const sqlite3 = _sqlite3pkg.verbose();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const escodegenOption = {
  format: {
    newline: '',
    indent: { style: '' }
  }
};

function generate(ast) {
  return escodegen.generate(ast, escodegenOption);
}

// ----------------------------------------
// load() のテスト
// ----------------------------------------
describe('SqlOptimizer load()', () => {
  const dbPath = path.join(__dirname, '_test_sql_optimizer.db');

  before((done) => {
    const db = new sqlite3.Database(dbPath);
    db.serialize(() => {
      db.run('CREATE TABLE items (label TEXT, id INTEGER, value INTEGER)');
      db.run("INSERT INTO items VALUES ('sword', 1, 100)");
      db.run("INSERT INTO items VALUES ('shield', 2, 200)");
      db.run('CREATE TABLE skills (label TEXT, id INTEGER)');
      db.run("INSERT INTO skills VALUES ('fire', 10)");
      db.close(done);
    });
  });

  after(() => {
    if (fs.existsSync(dbPath)) {
      fs.unlinkSync(dbPath);
    }
  });

  it('テーブルのデータが this.data に格納されること', () => {
    const optimizer = new SqlOptimizer(dbPath);
    return optimizer.load().then(() => {
      assert(optimizer.data['items']['sword'].id === 1);
      assert(optimizer.data['items']['sword'].value === 100);
      assert(optimizer.data['items']['shield'].id === 2);
    });
  });

  it('複数テーブルが全て読み込まれること', () => {
    const optimizer = new SqlOptimizer(dbPath);
    return optimizer.load().then(() => {
      assert(optimizer.data['items'] !== undefined);
      assert(optimizer.data['skills'] !== undefined);
      assert(optimizer.data['skills']['fire'].id === 10);
    });
  });
});

// ----------------------------------------
// optimize() のテスト
// ----------------------------------------
describe('SqlOptimizer optimize()', () => {
  let optimizer;

  beforeEach(() => {
    optimizer = new SqlOptimizer('dummy.db');
    optimizer.data = {
      items: {
        sword:    { label: 'sword',    id: 1,   value: 100 },
        shield:   { label: 'shield',   id: 2,   value: 200 },
        cursed:   { label: 'cursed',   id: -5,  value: -99 },
      }
    };
  });

  it('tkMock.Sql.table.key が id のリテラルに置換される', () => {
    const ast = esprima.parse('x = tkMock.Sql.items.sword;');
    optimizer.optimize(ast);
    assert(generate(ast) === 'x = 1;');
  });

  it('tkMock.Sql.table.key[column] が指定カラムのリテラルに置換される', () => {
    const ast = esprima.parse("x = tkMock.Sql.items.sword['value'];");
    optimizer.optimize(ast);
    assert(generate(ast) === 'x = 100;');
  });

  it('値が負の場合 UnaryExpression (-n) に変換される', () => {
    const ast = esprima.parse('x = tkMock.Sql.items.cursed;');
    optimizer.optimize(ast);
    assert(generate(ast) === 'x = -5;');
  });

  it('カラム指定で負の値の場合も UnaryExpression に変換される', () => {
    const ast = esprima.parse("x = tkMock.Sql.items.cursed['value'];");
    optimizer.optimize(ast);
    assert(generate(ast) === 'x = -99;');
  });

  it('存在しないキーの場合 Error がスローされる', () => {
    const ast = esprima.parse('x = tkMock.Sql.items.unknown;');
    assert.throws(() => {
      optimizer.optimize(ast);
    }, /optimizerSql/);
  });

  it('存在しないカラムの場合 Error がスローされる', () => {
    const ast = esprima.parse("x = tkMock.Sql.items.sword['noSuchCol'];");
    assert.throws(() => {
      optimizer.optimize(ast);
    }, /optimizerSql/);
  });

  it('tkMock.Sql にマッチしない MemberExpression はそのまま', () => {
    const ast = esprima.parse('x = foo.bar.baz.qux;');
    optimizer.optimize(ast);
    assert(generate(ast) === 'x = foo.bar.baz.qux;');
  });

  it('tokens.length が 4 未満のパターン (tkMock.Sql.items) はスキップ', () => {
    // tkMock.Sql.items は tokens.length = 3 なのでスキップされる
    const ast = esprima.parse('x = tkMock.Sql.items;');
    optimizer.optimize(ast);
    assert(generate(ast) === 'x = tkMock.Sql.items;');
  });
});
