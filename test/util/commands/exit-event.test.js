'use strict';

const assert = require('power-assert');
const ExitEvent = require('../../../js/util/commands/exit-event');
const Command = require('../../../js/util/command');
const executeLog = require('../../../js/util/execute-log');

describe('ExitEvent（イベント処理の中断）', () => {
  const exitEvent = new ExitEvent();
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(exitEvent instanceof Command);
    });
  });

  describe('JP_NAME', () => {
    it('JP_NAMEが設定されていること', () => {
      assert(exitEvent.JP_NAME === 'イベント処理の中断');
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(exitEvent.run());
    });
  });

  describe('output', () => {
    it('Exit命令を返す', () => {
      const ret = exitEvent.output();
      assert(ret[0] === 'Exit');
    });
  });
});
