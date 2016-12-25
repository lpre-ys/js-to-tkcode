const assert = require('power-assert');
const parseAssign = require('../../../js/lib/parser/parse-assign');
const Parser = require('../../../js/lib/parser/parser');

const esprima = require('esprima');

describe('Parser parseAssign', () => {
  let parser;
  beforeEach(() => {
    parser = new Parser();
  });
  describe('シンプルな代入', () => {
    it('定数', () => {
      const node = esprima.parse('test = 1;').body[0].expression;
      parseAssign(node, parser);

      assert(parser.outputs[0] == "Variable(0, 42, 42, 0, 0, 1, 0)");

    });
    it('変数', () => {
      const node = esprima.parse('test = test2').body[0].expression;
      parseAssign(node, parser);

      assert(parser.outputs[0] == "Variable(0, 42, 42, 0, 1, 43, 0)");

    });
    it('一時変数', () => {
      const node = esprima.parse('TMP[0] = 1;').body[0].expression;
      parseAssign(node, parser);

      assert(parser.outputs[0] == "Variable(0, 101, 101, 0, 0, 1, 0)");

    });
    describe('スイッチ(boolean)', () => {
      it('true', () => {
        const node = esprima.parse('isTest1 = true').body[0].expression;
        parseAssign(node, parser);

        assert(parser.outputs[0] == `Switch(0, 21, 21, 0)`);

      });
      it('false', () => {
        const node = esprima.parse('isTest1 = false').body[0].expression;
        parseAssign(node, parser);

        assert(parser.outputs[0] == `Switch(0, 21, 21, 1)`);

      });
    });
  });
  describe('複合代入演算子', () => {
    describe('リテラル', () => {
      it('足し算', () => {
        const node = esprima.parse('test += 37;').body[0].expression;
        parseAssign(node, parser);

        assert(parser.outputs[0] == `Variable(0, 42, 42, 1, 0, 37, 0)`);

      });
      it('引き算', () => {
        const node = esprima.parse('test -= 37;').body[0].expression;
        parseAssign(node, parser);

        assert(parser.outputs[0] == `Variable(0, 42, 42, 2, 0, 37, 0)`);

      });
      it('掛け算', () => {
        const node = esprima.parse('test *= 37;').body[0].expression;
        parseAssign(node, parser);

        assert(parser.outputs[0] == `Variable(0, 42, 42, 3, 0, 37, 0)`);

      });
      it('割り算', () => {
        const node = esprima.parse('test /= 37;').body[0].expression;
        parseAssign(node, parser);

        assert(parser.outputs[0] == `Variable(0, 42, 42, 4, 0, 37, 0)`);

      });
      it('余り', () => {
        const node = esprima.parse('test %= 37;').body[0].expression;
        parseAssign(node, parser);

        assert(parser.outputs[0] == `Variable(0, 42, 42, 5, 0, 37, 0)`);

      });
    });
  });

});
