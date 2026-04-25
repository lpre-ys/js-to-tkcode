import assert from 'power-assert';
import GetTick from '../../../js/util/commands/get-tick.js';
import Command from '../../../js/util/command.js';
import executeLog from '../../../js/util/execute-log.js';
import tkVarManager from '../../../js/lib/tk-var-manager.js';

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
