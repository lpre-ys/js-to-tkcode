const assert = require('power-assert');
const parseVar = require('../../../js/lib/parser/parse-var');
const tkVarManager = require('../../../js/lib/tk-var-manager');

const esprima = require('esprima');

describe('Parser parseVar', () => {
  beforeEach(() => {
    const varList = {
      'test': 42
    };
    const tmpStart = 100;
    const tmpEnd = 102;
    tkVarManager.setOptions({varList, tmpStart, tmpEnd});
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
