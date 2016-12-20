const assert = require('power-assert');
const parseBinary = require('../../../js/lib/parser/parse-binary');
const tmpVarFactory = require('../../../js/lib/tmp-var-factory');
const JsToTkcode = require('../../../js/lib/js-to-tkcode');

const esprima = require('esprima');
const escodegen = require('escodegen');

describe('Parser parseBinary', () => {
  let jsToTkcode;
  beforeEach(() => {
    const varList = {
      'test': 42,
      'test2': 43,
      'test3': 44
    };
    const tmpStart = 101;
    const tmpEnd = 200;
    const switchList = {
      'isTest1': 21
    };
    jsToTkcode = new JsToTkcode({
      varList,
      tmpStart,
      tmpEnd,
      switchList
    });
    tmpVarFactory.reset();

  });
  describe('リテラルとリテラルのシンプルな計算', () => {
    it('足し算', () => {
      const node = esprima.parse('1 + 2;').body[0].expression;
      const ret = parseBinary(node, jsToTkcode);

      assert(escodegen.generate(ret) == 3);
    });
    it('引き算', () => {
      const node = esprima.parse('6 - 2').body[0].expression;
      const ret = parseBinary(node, jsToTkcode);

      assert(escodegen.generate(ret) == 4);
    });
    it('掛け算', () => {
      const node = esprima.parse('3 * 2').body[0].expression;
      const ret = parseBinary(node, jsToTkcode);

      assert(escodegen.generate(ret) == 6);
    });
    it('割り算', () => {
      const node = esprima.parse('5 / 2').body[0].expression;
      const ret = parseBinary(node, jsToTkcode);

      assert(escodegen.generate(ret) == 2);
    });
    it('余り', () => {
      const node = esprima.parse('5 % 2').body[0].expression;
      const ret = parseBinary(node, jsToTkcode);

      assert(escodegen.generate(ret) == 1);
    });
  });
  describe('変数を含む計算', () => {
    it('左辺が変数、右辺がリテラル', () => {
      const node = esprima.parse('test2 + 2').body[0].expression;
      const ret = parseBinary(node, jsToTkcode);

      assert(escodegen.generate(ret) == 'TMP[0]');
      assert(jsToTkcode.outputs[0] == 'Variable(0, 101, 101, 0, 1, 43, 0)');
      assert(jsToTkcode.outputs[1] == 'Variable(0, 101, 101, 1, 0, 2, 0)');
    });
    it('左辺が定数、右辺がリテラル', () => {
      const node = esprima.parse('2 + test2').body[0].expression;
      const ret = parseBinary(node, jsToTkcode);

      assert(escodegen.generate(ret) == 'TMP[0]');

      assert(jsToTkcode.outputs[0] == 'Variable(0, 101, 101, 0, 0, 2, 0)');
      assert(jsToTkcode.outputs[1] == 'Variable(0, 101, 101, 1, 1, 43, 0)');
    });
    it('変数と変数', () => {
      const node = esprima.parse('test2 + test3').body[0].expression;
      const ret = parseBinary(node, jsToTkcode);

      assert(escodegen.generate(ret) == 'TMP[0]');

      assert(jsToTkcode.outputs[0] == 'Variable(0, 101, 101, 0, 1, 43, 0)');
      assert(jsToTkcode.outputs[1] == 'Variable(0, 101, 101, 1, 1, 44, 0)');
    });
  });

});
