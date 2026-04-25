import assert from 'power-assert';
import CancelAllAction from '../../../js/util/commands/cancel-all-action.js';
import Command from '../../../js/util/command.js';
import executeLog from '../../../js/util/execute-log.js';

describe('CancelAllAction（指定動作の全解除）', () => {
  const cancelAllAction = new CancelAllAction();
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(cancelAllAction instanceof Command);
    });
  });

  describe('JP_NAME', () => {
    it('JP_NAMEが設定されていること', () => {
      assert(cancelAllAction.JP_NAME === '指定動作の全解除');
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(cancelAllAction.run());
    });
  });

  describe('output', () => {
    it('ActionCancel命令を返す', () => {
      const ret = cancelAllAction.output();
      assert(ret[0] === 'ActionCancel');
    });
  });
});
