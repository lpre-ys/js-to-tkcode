'use strict';

const assert = require('power-assert');
const esprima = require('esprima');
const parseWhile = require('../../../js/lib/parser/parse-while');
const Parser = require('../../../js/lib/parser/parser');
const tkVarManager = require('../../../js/lib/tk-var-manager');
const tmpVarFactory = require('../../../js/lib/tmp-var-factory');

describe('Parser parseWhile', () => {
  let parser;
  const varList = { 'test': 42 };
  const tmpStart = 101;
  const tmpEnd = 200;
  beforeEach(() => {
    parser = new Parser();
    tkVarManager.setOptions({ varList, tmpStart, tmpEnd });
    tmpVarFactory.reset();
  });

  describe('動的条件のwhileループ', () => {
    it('Loop/If/body/Else/Break/EndIf/EndLoopを出力する', () => {
      const node = esprima.parse('while (test > 0) { test = 1; }').body[0];
      parseWhile(node, parser);
      assert(parser.outputs[0] === 'Loop');
      assert(parser.outputs[1] === 'If(01, 42, 0, 0, 3, 0)');
      assert(parser.outputs[2] === 'Variable(0, 42, 42, 0, 0, 1, 0)');
      assert(parser.outputs[3] === 'Else');
      assert(parser.outputs[4] === 'Break');
      assert(parser.outputs[5] === 'EndIf');
      assert(parser.outputs[6] === 'EndLoop');
    });
  });

  describe('リテラル条件のwhileループ（無限ループ）', () => {
    it('while(true)はLoop/body/EndLoopのみ出力する', () => {
      const node = esprima.parse('while (true) { test = 1; }').body[0];
      parseWhile(node, parser);
      assert(parser.outputs[0] === 'Loop');
      assert(parser.outputs[1] === 'Variable(0, 42, 42, 0, 0, 1, 0)');
      assert(parser.outputs[2] === 'EndLoop');
      assert(parser.outputs.length === 3);
    });
    it('If/Else/Breakが含まれない', () => {
      const node = esprima.parse('while (true) { test = 1; }').body[0];
      parseWhile(node, parser);
      assert(!parser.outputs.includes('Else'));
      assert(!parser.outputs.includes('Break'));
    });
  });
});
