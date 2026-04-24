'use strict';

const assert = require('power-assert');
const ExecAllAction = require('../../../js/util/commands/exec-all-action');
const Command = require('../../../js/util/command');
const executeLog = require('../../../js/util/execute-log');

describe('ExecAllAction（指定動作の全実行）', () => {
  const execAllAction = new ExecAllAction();
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(execAllAction instanceof Command);
    });
  });

  describe('JP_NAME', () => {
    it('JP_NAMEが設定されていること', () => {
      assert(execAllAction.JP_NAME === '指定動作の全実行');
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(execAllAction.run());
    });
  });

  describe('output', () => {
    it('ActionStart命令を返す', () => {
      const ret = execAllAction.output();
      assert(ret[0] === 'ActionStart');
    });
  });
});
