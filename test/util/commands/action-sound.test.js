import assert from 'power-assert';
import ActionSound from '../../../js/util/commands/action-sound.js';
import Command from '../../../js/util/command.js';
import executeLog from '../../../js/util/execute-log.js';

describe('ActionSound（アクション・効果音）', () => {
  const actionSound = new ActionSound();
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(actionSound instanceof Command);
    });
  });

  describe('JP_NAME', () => {
    it('JP_NAMEが設定されていること', () => {
      assert(actionSound.JP_NAME === 'アクション(効果音)');
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(actionSound.run('se.wav'));
    });
  });

  describe('output', () => {
    it('times=1（デフォルト）の場合1命令を返す', () => {
      const ret = actionSound.output('se.wav');
      assert(ret.length === 1);
      assert(ret[0] === 'SubAct(35, "se.wav", 100, 100, 50)');
    });
    it('times=2の場合2命令を返す', () => {
      const ret = actionSound.output('se.wav', 100, 100, 50, 2);
      assert(ret.length === 2);
      assert(ret[0] === ret[1]);
    });
    it('volume/tempo/balanceが反映される', () => {
      const ret = actionSound.output('test.wav', 80, 90, 40);
      assert(ret[0] === 'SubAct(35, "test.wav", 80, 90, 40)');
    });
  });
});
