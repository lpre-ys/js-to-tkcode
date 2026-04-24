'use strict';

const assert = require('power-assert');
const LockCamera = require('../../../js/util/commands/lock-camera');
const Command = require('../../../js/util/command');
const executeLog = require('../../../js/util/execute-log');

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
