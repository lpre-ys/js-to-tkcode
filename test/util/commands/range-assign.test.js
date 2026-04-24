'use strict';

const assert = require('power-assert');
const RangeAssign = require('../../../js/util/commands/range-assign');
const Command = require('../../../js/util/command');
const executeLog = require('../../../js/util/execute-log');
const tkVarManager = require('../../../js/lib/tk-var-manager');

describe('RangeAssign（変数の操作・範囲初期化）', () => {
  const rangeAssign = new RangeAssign();
  before(() => {
    tkVarManager.setOptions({ varList: { 'base': 10 }, tmpStart: 101, tmpEnd: 200 });
  });
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(rangeAssign instanceof Command);
    });
  });

  describe('JP_NAME', () => {
    it('JP_NAMEが設定されていること', () => {
      assert(rangeAssign.JP_NAME === '変数の操作(範囲初期化)');
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(rangeAssign.run('base', 5, 0));
    });
  });

  describe('output', () => {
    it('変数名を変数番号に変換してRange命令を返す', () => {
      const ret = rangeAssign.output('base', 5, 99);
      // base=10, base+quantity-1=14
      assert(ret[0] === 'Variable(1, 10, 14, 0, 0, 99, 0)');
    });
    it('quantity=1の場合、同じ変数番号の範囲になる', () => {
      const ret = rangeAssign.output('base', 1, 0);
      assert(ret[0] === 'Variable(1, 10, 10, 0, 0, 0, 0)');
    });
  });
});
