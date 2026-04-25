import assert from 'power-assert';
import ReleaseCamera from '../../../js/util/commands/release-camera.js';
import Command from '../../../js/util/command.js';
import executeLog from '../../../js/util/execute-log.js';

describe('ReleaseCamera（画面スクロール固定解除）', () => {
  const releaseCamera = new ReleaseCamera();
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(releaseCamera instanceof Command);
    });
  });

  describe('JP_NAME', () => {
    it('JP_NAMEが設定されていること', () => {
      assert(releaseCamera.JP_NAME === '画面のスクロール(固定解除)');
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(releaseCamera.run());
    });
  });

  describe('output', () => {
    it('Screenscroll(1, 0, 0, 0, 0)命令を返す', () => {
      const ret = releaseCamera.output();
      assert(ret[0] === 'Screenscroll(1, 0, 0, 0, 0)');
    });
  });
});
