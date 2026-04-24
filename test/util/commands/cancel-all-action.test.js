'use strict';

const assert = require('power-assert');
const CancelAllAction = require('../../../js/util/commands/cancel-all-action');
const Command = require('../../../js/util/command');
const executeLog = require('../../../js/util/execute-log');

describe('CancelAllAction（指定動作の全解除）', () => {
  const cancelAllAction = new CancelAllAction();
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(cancelAllAction instanceof Command);
    });
  });

  describe('JP_NAME', () => {
    it('JP_NAMEが設定されていること', () => {
      assert(cancelAllAction.JP_NAME === '指定動作の全解除');
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(cancelAllAction.run());
    });
  });

  describe('output', () => {
    it('ActionCancel命令を返す', () => {
      const ret = cancelAllAction.output();
      assert(ret[0] === 'ActionCancel');
    });
  });
});
