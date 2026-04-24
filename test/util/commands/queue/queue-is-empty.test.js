'use strict';

const assert = require('power-assert');
const QueueIsEmpty = require('../../../../js/util/commands/queue/queue-is-empty');
const Command = require('../../../../js/util/command');
const executeLog = require('../../../../js/util/execute-log');
const tkVarManager = require('../../../../js/lib/tk-var-manager');

describe('QueueIsEmpty', () => {
  const queueIsEmpty = new QueueIsEmpty();
  before(() => {
    tkVarManager.setOptions({ varList: { 'test': 42, 'flag': 50 }, tmpStart: 101, tmpEnd: 200 });
  });
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(queueIsEmpty instanceof Command);
    });
  });

  describe('JP_NAME', () => {
    it('JP_NAMEが設定されていること', () => {
      assert(queueIsEmpty.JP_NAME === 'SET:Queue-isEmpty');
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(queueIsEmpty.run('test', 'flag'));
    });
  });

  describe('output', () => {
    it('isEmptyチェックのIf命令が先頭に出力される', () => {
      const ret = queueIsEmpty.output('test', 'flag');
      // base=42, base+1=43: If(01, 42, 1, 43, 0, 1)
      assert(ret[0] === 'If(01, 42, 1, 43, 0, 1)');
    });
    it('true時のSwitch ONが含まれる', () => {
      const ret = queueIsEmpty.output('test', 'flag');
      // retBoolean=50: Switch(0, 50, 50, 0)
      assert(ret[1] === 'Switch(0, 50, 50, 0)');
    });
    it('false時のSwitch OFFが含まれる', () => {
      const ret = queueIsEmpty.output('test', 'flag');
      assert(ret[3] === 'Switch(0, 50, 50, 1)');
    });
    it('Else/EndIfが含まれる', () => {
      const ret = queueIsEmpty.output('test', 'flag');
      assert(ret.includes('Else'));
      assert(ret.includes('EndIf'));
    });
    it('合計5命令が出力される', () => {
      const ret = queueIsEmpty.output('test', 'flag');
      assert(ret.length === 5);
    });
  });
});
