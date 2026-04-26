import assert from 'power-assert';
import parseVar from '../../../js/lib/parser/parse-var.js';
import tkVarManager from '../../../js/lib/tk-var-manager.js';
import tmpVarFactory from '../../../js/lib/tmp-var-factory.js';
import esprima from 'esprima';


describe('Parser parseVar', () => {
  beforeEach(() => {
    const varList = {
      'test': 42
    };
    const tmpStart = 100;
    const tmpEnd = 102;
    tkVarManager.setOptions({varList, tmpStart, tmpEnd});
    tmpVarFactory.reset();
  });
  describe('正常系', () => {
    describe('Identifier', () => {
      it('変数', () => {
        const node = esprima.parse('test').body[0].expression;
        const ret = parseVar(node);

        assert(ret == 42);
      });
    });
    describe('MemberExpression', () => {
      it('TMP[0]', () => {
        const node = esprima.parse('TMP[0]').body[0].expression;
        const ret = parseVar(node);

        assert(ret == 100);
      });
      it('普通の配列(添え時0)', () => {
        const node = esprima.parse('test[0]').body[0].expression;
        const ret = parseVar(node);

        assert(ret == 42);
      });
      it('普通の配列(添え時3)', () => {
        const node = esprima.parse('test[3]').body[0].expression;
        const ret = parseVar(node);

        assert(ret == 45);
      });
      describe('添え字が変数（Identifier）', () => {
        it('返り値がisArray:trueのオブジェクトになる', () => {
          const mockParser = { parseAst: () => {} };
          const node = esprima.parse('test[idx]').body[0].expression;
          const ret = parseVar(node, mockParser);

          assert.deepEqual(ret, { isArray: true, indexVarNum: 100 });
        });
        it('parserのparseAstが呼ばれる', () => {
          let called = false;
          const mockParser = { parseAst: () => { called = true; } };
          const node = esprima.parse('test[idx]').body[0].expression;
          parseVar(node, mockParser);

          assert(called);
        });
      });
      describe('添え字が演算式（BinaryExpression）', () => {
        it('加算式: test[3+2] → 47', () => {
          const node = esprima.parse('test[3 + 2]').body[0].expression;
          const ret = parseVar(node);

          assert(ret === 47);
        });
        it('減算式: test[5-2] → 45', () => {
          const node = esprima.parse('test[5 - 2]').body[0].expression;
          const ret = parseVar(node);

          assert(ret === 45);
        });
        it('両辺がLiteralでない場合はエラー', () => {
          const node = esprima.parse('test[a + 2]').body[0].expression;

          assert.throws(() => { parseVar(node); }, Error);
        });
        it('未対応の演算子はエラー', () => {
          const node = esprima.parse('test[3 * 2]').body[0].expression;

          assert.throws(() => { parseVar(node); }, Error);
        });
      });
      it('添え字が非対応の型（MemberExpression等）はエラー', () => {
        const node = esprima.parse('test[foo.bar]').body[0].expression;

        assert.throws(() => { parseVar(node); }, Error);
      });
    });
  });
  describe('異常系', () => {
    describe('MemberExpression', () => {
      it('Literal以外のプロパティ', () => {
        const node = esprima.parse('TEST.test').body[0].expression;

        assert.throws(() => {parseVar(node);}, Error);
      });
    });
    it('ノードタイプが不正', () => {
      const node = esprima.parse('test');

      assert.throws(() => {parseVar(node);}, Error);
    });
  });
});
