import assert from 'power-assert';
import ActionGraphic from '../../../js/util/commands/action-graphic.js';
import Command from '../../../js/util/command.js';
import executeLog from '../../../js/util/execute-log.js';

describe('ActionGraphic（アクション・グラフィック変更）', () => {
  const actionGraphic = new ActionGraphic();
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(actionGraphic instanceof Command);
    });
  });

  describe('JP_NAME', () => {
    it('JP_NAMEが設定されていること', () => {
      assert(actionGraphic.JP_NAME === 'アクション(グラフィック変更)');
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(actionGraphic.run('chara.png', 3));
    });
  });

  describe('output', () => {
    it('正しい形式のSubAct命令を返す', () => {
      const ret = actionGraphic.output('chara.png', 3);
      assert(ret[0] === 'SubAct(34, "chara.png", 3)');
    });
  });
});
