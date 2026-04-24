'use strict';

const assert = require('power-assert');
const esprima = require('esprima');
const parseIf = require('../../../js/lib/parser/parse-if');
const Parser = require('../../../js/lib/parser/parser');
const tkVarManager = require('../../../js/lib/tk-var-manager');
const tmpVarFactory = require('../../../js/lib/tmp-var-factory');

describe('Parser parseIf', () => {
  let parser;
  const varList = { 'test': 42, 'test2': 43 };
  const tmpStart = 101;
  const tmpEnd = 200;
  const switchList = {};
  beforeEach(() => {
    parser = new Parser();
    tkVarManager.setOptions({ varList, tmpStart, tmpEnd, switchList });
    tmpVarFactory.reset();
  });

  describe('boolean定数による最適化', () => {
    it('if(true)はconsequentのみ展開される', () => {
      const node = esprima.parse('if (true) { test = 1; }').body[0];
      parseIf(node, parser);
      assert(parser.outputs.length === 1);
      assert(parser.outputs[0] === 'Variable(0, 42, 42, 0, 0, 1, 0)');
    });
    it('if(false)は何も出力されない', () => {
      const node = esprima.parse('if (false) { test = 1; }').body[0];
      parseIf(node, parser);
      assert(parser.outputs.length === 0);
    });
    it('if(false) else はalternateのみ展開される', () => {
      const node = esprima.parse('if (false) { test = 1; } else { test = 2; }').body[0];
      parseIf(node, parser);
      assert(parser.outputs.length === 1);
      assert(parser.outputs[0] === 'Variable(0, 42, 42, 0, 0, 2, 0)');
    });
  });

  describe('リテラル同士の比較による最適化', () => {
    it('if(3 > 5) falseのelseのみ展開される', () => {
      const node = esprima.parse('if (3 > 5) { test = 1; } else { test = 2; }').body[0];
      parseIf(node, parser);
      assert(parser.outputs.length === 1);
      assert(parser.outputs[0] === 'Variable(0, 42, 42, 0, 0, 2, 0)');
    });
    it('if(5 > 3) trueのconsequentのみ展開される', () => {
      const node = esprima.parse('if (5 > 3) { test = 1; } else { test = 2; }').body[0];
      parseIf(node, parser);
      assert(parser.outputs.length === 1);
      assert(parser.outputs[0] === 'Variable(0, 42, 42, 0, 0, 1, 0)');
    });
  });

  describe('動的条件のIFコマンド生成', () => {
    it('else無しの場合、If/body/EndIfを出力する', () => {
      const node = esprima.parse('if (test > 5) { test = 1; }').body[0];
      parseIf(node, parser);
      assert(parser.outputs[0] === 'If(01, 42, 0, 5, 3, 0)');
      assert(parser.outputs[1] === 'Variable(0, 42, 42, 0, 0, 1, 0)');
      assert(parser.outputs[2] === 'EndIf');
    });
    it('else有りの場合、If/body/Else/alternate/EndIfを出力する', () => {
      const node = esprima.parse('if (test > 5) { test = 1; } else { test = 2; }').body[0];
      parseIf(node, parser);
      assert(parser.outputs[0] === 'If(01, 42, 0, 5, 3, 1)');
      assert(parser.outputs[1] === 'Variable(0, 42, 42, 0, 0, 1, 0)');
      assert(parser.outputs[2] === 'Else');
      assert(parser.outputs[3] === 'Variable(0, 42, 42, 0, 0, 2, 0)');
      assert(parser.outputs[4] === 'EndIf');
    });
    it('test == 0の==条件が正しく展開される', () => {
      const node = esprima.parse('if (test == 0) { test = 9; }').body[0];
      parseIf(node, parser);
      assert(parser.outputs[0] === 'If(01, 42, 0, 0, 0, 0)');
      assert(parser.outputs[parser.outputs.length - 1] === 'EndIf');
    });
  });
});
