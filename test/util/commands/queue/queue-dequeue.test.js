'use strict';

const assert = require('power-assert');
const QueueDequeue = require('../../../../js/util/commands/queue/queue-dequeue');
const Command = require('../../../../js/util/command');
const executeLog = require('../../../../js/util/execute-log');
const tkVarManager = require('../../../../js/lib/tk-var-manager');

describe('QueueDequeue', () => {
  const queueDequeue = new QueueDequeue();
  before(() => {
    tkVarManager.setOptions({ varList: { 'test': 42, 'test2': 43 }, tmpStart: 101, tmpEnd: 200 });
  });
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(queueDequeue instanceof Command);
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(queueDequeue.run('test', 'test2'));
    });
  });

  describe('output', () => {
    it('isEmptyチェックのIf命令が先頭に出力される', () => {
      const ret = queueDequeue.output('test', 'test2');
      // base=42, base+1=43: If(01, 42, 1, 43, 0, 1)
      assert(ret[0] === 'If(01, 42, 1, 43, 0, 1)');
    });
    it('isEmpty時のダミー変数代入が含まれる', () => {
      const ret = queueDequeue.output('test', 'test2');
      // retVar=43: Variable(0, 43, 43, 0, 0, 0, 0)
      assert(ret[1] === 'Variable(0, 43, 43, 0, 0, 0, 0)');
    });
    it('dequeue値の代入命令が含まれる', () => {
      const ret = queueDequeue.output('test', 'test2');
      // Variable(0, retVar=43, 43, 0, 2, base=42, 0)
      assert(ret.some(r => r === 'Variable(0, 43, 43, 0, 2, 42, 0)'));
    });
    it('Else/EndIfが含まれる', () => {
      const ret = queueDequeue.output('test', 'test2');
      assert(ret.includes('Else'));
      assert(ret.includes('EndIf'));
    });
  });
});
