'use strict';

const assert = require('power-assert');
const GetTick = require('../../../js/util/commands/get-tick');
const Command = require('../../../js/util/command');
const executeLog = require('../../../js/util/execute-log');
const tkVarManager = require('../../../js/lib/tk-var-manager');

describe('GetTick（MIDI演奏位置取得）', () => {
  const getTick = new GetTick();
  before(() => {
    tkVarManager.setOptions({ varList: { 'test': 42 }, tmpStart: 101, tmpEnd: 200 });
  });
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(getTick instanceof Command);
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(getTick.run(42));
    });
  });

  describe('output', () => {
    it('receiveが数値の場合そのまま使われる', () => {
      const ret = getTick.output(42);
      assert(ret[0] === 'Variable(0, 42, 42, 0, 7, 8, 0)');
    });
    it('receiveが文字列（変数名）の場合、変数番号に変換される', () => {
      const ret = getTick.output('test');
      assert(ret[0] === 'Variable(0, 42, 42, 0, 7, 8, 0)');
    });
  });
});
