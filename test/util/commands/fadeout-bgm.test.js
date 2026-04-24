import assert from 'power-assert';
import FadeoutBgm from '../../../js/util/commands/fadeout-bgm.js';
import Command from '../../../js/util/command.js';
import executeLog from '../../../js/util/execute-log.js';

describe('FadeoutBgm（BGMのフェードアウト）', () => {
  const fadeoutBgm = new FadeoutBgm();
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(fadeoutBgm instanceof Command);
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(fadeoutBgm.run());
    });
  });

  describe('output', () => {
    it('デフォルト(time=10)の場合、1000ミリ秒になる', () => {
      const ret = fadeoutBgm.output();
      assert(ret[0] === 'FadeoutBGM(1000)');
    });
    it('time=5の場合、500ミリ秒になる（0.1秒単位→*100変換）', () => {
      const ret = fadeoutBgm.output(5);
      assert(ret[0] === 'FadeoutBGM(500)');
    });
    it('time=20の場合、2000ミリ秒になる', () => {
      const ret = fadeoutBgm.output(20);
      assert(ret[0] === 'FadeoutBGM(2000)');
    });
  });
});
