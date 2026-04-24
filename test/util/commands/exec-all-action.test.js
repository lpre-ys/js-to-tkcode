import assert from 'power-assert';
import ExecAllAction from '../../../js/util/commands/exec-all-action.js';
import Command from '../../../js/util/command.js';
import executeLog from '../../../js/util/execute-log.js';

describe('ExecAllAction（指定動作の全実行）', () => {
  const execAllAction = new ExecAllAction();
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(execAllAction instanceof Command);
    });
  });

  describe('JP_NAME', () => {
    it('JP_NAMEが設定されていること', () => {
      assert(execAllAction.JP_NAME === '指定動作の全実行');
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(execAllAction.run());
    });
  });

  describe('output', () => {
    it('ActionStart命令を返す', () => {
      const ret = execAllAction.output();
      assert(ret[0] === 'ActionStart');
    });
  });
});
