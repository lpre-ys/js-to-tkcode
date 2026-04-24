import assert from 'power-assert';
import optimizeFor from '../../../js/lib/optimizer/optimize-for.js';
import esprima from 'esprima';
import escodegen from 'escodegen';


const escodegenOption = {
  format: {
    newline: '',
    indent: {
      style: ''
    }
  }
};

describe('Optimizer optimizeFor', () => {
  it('index展開無し', () => {
    const code = `for (let i = 0; i < 3; i++) {test = 1}`;
    const node = esprima.parse(code).body[0];
    const ret = optimizeFor(node);

    assert(escodegen.generate(ret, escodegenOption) == `{test = 1;test = 1;test = 1;}`);
  });
  it('indexリテラル展開あり', () => {
    const code = `for (let i = 0; i < 3; i++) {test = i}`;
    const node = esprima.parse(code).body[0];
    const ret = optimizeFor(node);

    assert(escodegen.generate(ret, escodegenOption) == `{test = 0;test = 1;test = 2;}`);
  });
  it('body複数行', () => {
    const code = `for (let i = 0; i < 3; i++) {test = i; test2 = i * 2}`;
    const node = esprima.parse(code).body[0];
    const ret = optimizeFor(node);

    assert(escodegen.generate(ret, escodegenOption) == `{test = 0;test2 = 0 * 2;test = 1;test2 = 1 * 2;test = 2;test2 = 2 * 2;}`);
  });
  it('MAX値が定数', () => {
    const code = `for (let i = 0; i < tkMock.Const.TEST_FOR_MAX; i++) {test = 1}`;
    const node = esprima.parse(code).body[0];
    const Const = {'TEST_FOR_MAX': 4};
    const ret = optimizeFor(node, Const);

    assert(escodegen.generate(ret, escodegenOption) == `{test = 1;test = 1;test = 1;test = 1;}`);
  });

  it('戻り値がBlockStatementである', () => {
    const code = `for (let i = 0; i < 2; i++) {test = 1}`;
    const node = esprima.parse(code).body[0];
    const ret = optimizeFor(node);
    assert(ret.type === 'BlockStatement');
    assert(Array.isArray(ret.body));
  });
});
