import assert from 'power-assert';
import CallMapEvent from '../../../js/util/commands/call-map-event.js';
import Command from '../../../js/util/command.js';
import executeLog from '../../../js/util/execute-log.js';
import tkVarManager from '../../../js/lib/tk-var-manager.js';

describe('CallMapEvent（イベントの呼び出し・MAP）', () => {
  const callMapEvent = new CallMapEvent();
  before(() => {
    tkVarManager.setOptions({ varList: { 'evId': 5, 'evPage': 2 }, tmpStart: 101, tmpEnd: 200 });
  });
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(callMapEvent instanceof Command);
    });
  });

  describe('JP_NAME', () => {
    it('JP_NAMEが設定されていること', () => {
      assert(callMapEvent.JP_NAME === 'イベントの呼び出し(MAP)');
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(callMapEvent.run(3, 1));
    });
  });

  describe('output', () => {
    it('idが整数の場合、type=1になる', () => {
      const ret = callMapEvent.output(3, 1);
      assert(ret[0] === 'Call(1, 3, 1)');
    });
    it('idが文字列（変数名）の場合、type=2になる', () => {
      const ret = callMapEvent.output('evId', 'evPage');
      assert(ret[0] === 'Call(2, 5, 2)');
    });
    it('pageのデフォルト値は1', () => {
      const ret = callMapEvent.output(3);
      assert(ret[0] === 'Call(1, 3, 1)');
    });
  });
});
