import assert from 'power-assert';
import PlaySound from '../../../js/util/commands/play-sound.js';
import Command from '../../../js/util/command.js';
import executeLog from '../../../js/util/execute-log.js';

describe('PlaySound（効果音の演奏）', () => {
  const playSound = new PlaySound();
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(playSound instanceof Command);
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(playSound.run('se.wav'));
    });
  });

  describe('output', () => {
    it('デフォルト値で正しい命令を返す', () => {
      const ret = playSound.output('se.wav');
      assert(ret[0] === 'PlaySE("se.wav", 100, 100, 50)');
    });
    it('volume/tempo/balanceが反映される', () => {
      const ret = playSound.output('se.wav', 80, 90, 40);
      assert(ret[0] === 'PlaySE("se.wav", 80, 90, 40)');
    });
  });
});
