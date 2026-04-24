'use strict';

const assert = require('power-assert');
const Action = require('../../../js/util/commands/action');
const Command = require('../../../js/util/command');
const executeLog = require('../../../js/util/execute-log');

describe('Action（アクション）', () => {
  const action = new Action();
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(action instanceof Command);
    });
  });

  describe('JP_NAME', () => {
    it('JP_NAMEが設定されていること', () => {
      assert(action.JP_NAME === 'アクション');
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(action.run(0));
    });
  });

  describe('output', () => {
    it('times=1（デフォルト）の場合1命令を返す', () => {
      const ret = action.output(0);
      assert(ret.length === 1);
      assert(ret[0] === 'SubAct(0)');
    });
    it('times=3の場合3命令を返す', () => {
      const ret = action.output(12, 3);
      assert(ret.length === 3);
      assert(ret.every(r => r === 'SubAct(12)'));
    });
  });
});
