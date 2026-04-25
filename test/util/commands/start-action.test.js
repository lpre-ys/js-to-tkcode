import assert from 'power-assert';
import StartAction from '../../../js/util/commands/start-action.js';
import Command from '../../../js/util/command.js';
import executeLog from '../../../js/util/execute-log.js';

describe('StartAction（キャラクターの動作指定）', () => {
  const startAction = new StartAction();
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(startAction instanceof Command);
    });
  });

  describe('JP_NAME', () => {
    it('JP_NAMEが設定されていること', () => {
      assert(startAction.JP_NAME === 'キャラクターの動作指定');
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(startAction.run(10001));
    });
  });

  describe('output', () => {
    it('デフォルト値で正しい命令を返す', () => {
      const ret = startAction.output(10001);
      // repeat=false(0), speed=8, ignore=0
      assert(ret[0] === 'SetAction(10001, 8, 0, 0)');
    });
    it('repeat=trueの場合、第3引数が1になる', () => {
      const ret = startAction.output(10001, true);
      assert(ret[0] === 'SetAction(10001, 8, 1, 0)');
    });
    it('speed/ignoreが反映される', () => {
      const ret = startAction.output(10001, false, 4, 1);
      assert(ret[0] === 'SetAction(10001, 4, 0, 1)');
    });
  });
});
