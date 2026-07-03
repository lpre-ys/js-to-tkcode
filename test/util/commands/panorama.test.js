import assert from 'power-assert';
import Panorama from '../../../js/util/commands/panorama.js';
import Command from '../../../js/util/command.js';
import executeLog from '../../../js/util/execute-log.js';

describe('Panorama（遠景の変更）', () => {
  const panorama = new Panorama();
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(panorama instanceof Command);
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(panorama.run('panorama.png'));
    });
  });

  describe('output', () => {
    it('デフォルト値の場合、ループ・スクロールなしになる', () => {
      const ret = panorama.output('panorama.png');
      assert(ret[0] === 'Panorama("panorama.png", 0, 0, 0, 0, 0, 0)');
    });
    it('roopX/roopY/scrollX/speedX/scrollY/speedYが反映される', () => {
      const ret = panorama.output('panorama.png', true, true, true, 4, true, -4);
      assert(ret[0] === 'Panorama("panorama.png", 1, 1, 1, 4, 1, -4)');
    });
  });
});
