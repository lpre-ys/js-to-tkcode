import assert from 'power-assert';
import PlayBgm from '../../../js/util/commands/play-bgm.js';
import Command from '../../../js/util/command.js';
import executeLog from '../../../js/util/execute-log.js';

describe('PlayBgm（BGMの演奏）', () => {
  const playBgm = new PlayBgm();
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(playBgm instanceof Command);
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(playBgm.run('bgm.ogg'));
    });
  });

  describe('output', () => {
    it('デフォルト値で正しい命令を返す', () => {
      const ret = playBgm.output('bgm.ogg');
      assert(ret[0] === 'PlayBGM("bgm.ogg", 0, 100, 100, 50)');
    });
    it('time/volume/tempo/balanceが反映される', () => {
      const ret = playBgm.output('bgm.ogg', 10, 80, 90, 40);
      assert(ret[0] === 'PlayBGM("bgm.ogg", 10, 80, 90, 40)');
    });
  });
});
