import assert from 'power-assert';
import ExitEvent from '../../../js/util/commands/exit-event.js';
import Command from '../../../js/util/command.js';
import executeLog from '../../../js/util/execute-log.js';

describe('ExitEvent（イベント処理の中断）', () => {
  const exitEvent = new ExitEvent();
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(exitEvent instanceof Command);
    });
  });

  describe('JP_NAME', () => {
    it('JP_NAMEが設定されていること', () => {
      assert(exitEvent.JP_NAME === 'イベント処理の中断');
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(exitEvent.run());
    });
  });

  describe('output', () => {
    it('Exit命令を返す', () => {
      const ret = exitEvent.output();
      assert(ret[0] === 'Exit');
    });
  });
});
