'use strict';

const assert = require('power-assert');
const RangeBoolean = require('../../../js/util/commands/range-boolean');
const Command = require('../../../js/util/command');
const executeLog = require('../../../js/util/execute-log');
const tkVarManager = require('../../../js/lib/tk-var-manager');

describe('RangeBoolean（スイッチの操作・範囲初期化）', () => {
  const rangeBoolean = new RangeBoolean();
  before(() => {
    tkVarManager.setOptions({ varList: { 'base': 10 }, tmpStart: 101, tmpEnd: 200 });
  });
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(rangeBoolean instanceof Command);
    });
  });

  describe('JP_NAME', () => {
    it('JP_NAMEが設定されていること', () => {
      assert(rangeBoolean.JP_NAME === 'スイッチの操作(範囲初期化)');
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(rangeBoolean.run('base', 5, true));
    });
  });

  describe('output', () => {
    it('value=trueの場合、Switch第4引数が0（ONを示す）になる', () => {
      const ret = rangeBoolean.output('base', 5, true);
      // base=10, base+quantity-1=14, value ? 0 : 1 → 0
      assert(ret[0] === 'Switch(1, 10, 14, 0)');
    });
    it('value=falseの場合、Switch第4引数が1（OFFを示す）になる', () => {
      const ret = rangeBoolean.output('base', 5, false);
      assert(ret[0] === 'Switch(1, 10, 14, 1)');
    });
  });
});
