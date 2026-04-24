import assert from 'power-assert';
import LockCamera from '../../../js/util/commands/lock-camera.js';
import Command from '../../../js/util/command.js';
import executeLog from '../../../js/util/execute-log.js';

describe('LockCamera（画面スクロール固定）', () => {
  const lockCamera = new LockCamera();
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(lockCamera instanceof Command);
    });
  });

  describe('JP_NAME', () => {
    it('JP_NAMEが設定されていること', () => {
      assert(lockCamera.JP_NAME === '画面のスクロール(固定)');
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(lockCamera.run());
    });
  });

  describe('output', () => {
    it('Screenscroll(0, 0, 0, 0, 0)命令を返す', () => {
      const ret = lockCamera.output();
      assert(ret[0] === 'Screenscroll(0, 0, 0, 0, 0)');
    });
  });
});
