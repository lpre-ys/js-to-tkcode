import assert from 'power-assert';
import QueueEnqueue from '../../../../js/util/commands/queue/queue-enqueue.js';
import Command from '../../../../js/util/command.js';
import executeLog from '../../../../js/util/execute-log.js';
import tkVarManager from '../../../../js/lib/tk-var-manager.js';

describe('QueueEnqueue', () => {
  const queueEnqueue = new QueueEnqueue();
  before(() => {
    tkVarManager.setOptions({ varList: { 'test': 42, 'val': 50 }, tmpStart: 101, tmpEnd: 200 });
  });
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(queueEnqueue instanceof Command);
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(queueEnqueue.run('test', 1));
    });
  });

  describe('output (整数値)', () => {
    it('isFullチェックの命令が含まれる', () => {
      const ret = queueEnqueue.output('test', 1);
      // base=42: If(01, 42, 1, base+3=45, 0, 1)
      assert(ret.some(r => r.startsWith('If(01, 42,')));
    });
    it('Else/EndIfが含まれる', () => {
      const ret = queueEnqueue.output('test', 1);
      assert(ret.includes('Else'));
      assert(ret.includes('EndIf'));
    });
    it('整数値のenqueue命令（Variable type=2）が含まれる', () => {
      const ret = queueEnqueue.output('test', 99);
      // 整数値: Variable(2, base+1=43, 0, 0, 0, 99, 0) + trailing space
      assert(ret.some(r => r.trim() === 'Variable(2, 43, 0, 0, 0, 99, 0)'));
    });
  });

  describe('output (変数名)', () => {
    it('変数のenqueue命令（Variable type=2 valueType=1）が含まれる', () => {
      const ret = queueEnqueue.output('test', 'val');
      // var: Variable(2, base+1=43, 0, 0, 1, 50, 0)
      assert(ret.some(r => r === 'Variable(2, 43, 0, 0, 1, 50, 0)'));
    });
  });
});
