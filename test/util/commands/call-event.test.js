'use strict';

const assert = require('power-assert');
const CallEvent = require('../../../js/util/commands/call-event');
const Command = require('../../../js/util/command');
const executeLog = require('../../../js/util/execute-log');

describe('CallEvent（イベントの呼び出し・コモン）', () => {
  const callEvent = new CallEvent();
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(callEvent instanceof Command);
    });
  });

  describe('JP_NAME', () => {
    it('JP_NAMEが設定されていること', () => {
      assert(callEvent.JP_NAME === 'イベントの呼び出し(コモン)');
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(callEvent.run(5));
    });
  });

  describe('output', () => {
    it('Call(0, id, 0)命令を返す', () => {
      const ret = callEvent.output(5);
      assert(ret[0] === 'Call(0, 5, 0)');
    });
  });
});
