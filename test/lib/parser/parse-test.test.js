const assert = require('power-assert');
const parseTest = require('../../../js/lib/parser/parse-test');
const tkVarManager = require('../../../js/lib/tk-var-manager');

const esprima = require('esprima');

describe('Parser parseTest', () => {
  before(() => {
    const varList = {
      'test': 42,
      'test2': 43
    };
    const tmpStart = 100;
    const tmpEnd = 102;
    tkVarManager.setOptions({varList, tmpStart, tmpEnd});
  });
  describe('正常系', () => {
    it('Literalの場合、falseを返す', () => {
      const node = esprima.parse('true').body[0].expression;
      const ret = parseTest(node);

      assert(ret === false);
    });
    describe('変数比較', () => {
      it('戻り値がtrueであること', () => {
        const node = esprima.parse('test == 123').body[0].expression;
        const ret = parseTest(node, []);

        assert(ret === true);
      });
      it('右辺が変数の場合', () => {
        const node = esprima.parse('test == test2').body[0].expression;
        const outputs = [];
        parseTest(node, outputs);

        assert(outputs[0] === `If(01, 42, 1, 43, 0, 0)`);
      });
      describe('outputs', () => {
        it('==', () => {
          const node = esprima.parse('test == 123').body[0].expression;
          const outputs = [];
          parseTest(node, outputs);

          assert(outputs[0] === `If(01, 42, 0, 123, 0, 0)`);
        });
        it('>=', () => {
          const node = esprima.parse('test >= 123').body[0].expression;
          const outputs = [];
          parseTest(node, outputs);

          assert(outputs[0] === `If(01, 42, 0, 123, 1, 0)`);
        });
        it('<=', () => {
          const node = esprima.parse('test <= 123').body[0].expression;
          const outputs = [];
          parseTest(node, outputs);

          assert(outputs[0] === `If(01, 42, 0, 123, 2, 0)`);
        });
        it('>', () => {
          const node = esprima.parse('test > 123').body[0].expression;
          const outputs = [];
          parseTest(node, outputs);

          assert(outputs[0] === `If(01, 42, 0, 123, 3, 0)`);
        });
        it('<', () => {
          const node = esprima.parse('test < 123').body[0].expression;
          const outputs = [];
          parseTest(node, outputs);

          assert(outputs[0] === `If(01, 42, 0, 123, 4, 0)`);
        });
        it('!=', () => {
          const node = esprima.parse('test != 123').body[0].expression;
          const outputs = [];
          parseTest(node, outputs);

          assert(outputs[0] === `If(01, 42, 0, 123, 5, 0)`);
        });
      });
    });
    describe('switch', () => {
      it('戻り値がtrueであること', () => {
        const node = esprima.parse('test').body[0].expression;
        const ret = parseTest(node, []);

        assert(ret === true);
      });
      it('outputsにスイッチtrueのIf文が設定されること', () => {
        const node = esprima.parse('test').body[0].expression;
        const outputs = [];
        parseTest(node, outputs);

        assert(outputs[0] === `If(00, 42, 0, 0, 0, 0)`);
      });
    });
    describe('!switch', () => {
      it('戻り値がtrueであること', () => {
        const node = esprima.parse('test').body[0].expression;
        const ret = parseTest(node, []);

        assert(ret === true);
      });
      it('outputsにスイッチfalseのIf文が設定されること', () => {
        const node = esprima.parse('!test').body[0].expression;
        const outputs = [];
        parseTest(node, outputs);

        assert(outputs[0] === `If(00, 42, 1, 0, 0, 0)`);
      });
    });
  });
  describe('異常系', () => {
    it('未対応のノードタイプ', () => {
      const node = esprima.parse('test');

      assert.throws(() => {parseTest(node);}, Error);
    });
  });
});
