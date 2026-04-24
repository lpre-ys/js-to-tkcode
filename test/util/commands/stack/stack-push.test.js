'use strict';

const assert = require('power-assert');
const StackPush = require('../../../../js/util/commands/stack/stack-push');
const Command = require('../../../../js/util/command');
const executeLog = require('../../../../js/util/execute-log');
const tkVarManager = require('../../../../js/lib/tk-var-manager');
const tmpVarFactory = require('../../../../js/lib/tmp-var-factory');

describe('StackPush', () => {
  const stackPush = new StackPush();
  before(() => {
    tkVarManager.setOptions({ varList: { 'test': 42, 'val': 50 }, tmpStart: 101, tmpEnd: 200 });
  });
  beforeEach(() => {
    executeLog.reset();
    tmpVarFactory.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(stackPush instanceof Command);
    });
  });

  describe('JP_NAME', () => {
    it('JP_NAMEが設定されていること', () => {
      assert(stackPush.JP_NAME === 'SET:stack-PUSH');
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(stackPush.run('test', 99));
    });
  });

  describe('output (length=1, 整数値)', () => {
    it('isFullチェックのIf命令が先頭に出力される', () => {
      const ret = stackPush.output('test', 99);
      // base=42, base+1=43: If(01, 42, 1, 43, 1, 1)
      assert(ret[0] === 'If(01, 42, 1, 43, 1, 1)');
    });
    it('Else/EndIfが含まれる', () => {
      const ret = stackPush.output('test', 99);
      assert(ret.includes('Else'));
      assert(ret.includes('EndIf'));
    });
    it('整数値のpush命令が含まれる', () => {
      const ret = stackPush.output('test', 99);
      // Variable(2, base=42, 0, 0, 0, 99, 0)
      assert(ret.some(r => r === 'Variable(2, 42, 0, 0, 0, 99, 0)'));
    });
    it('TOPインクリメント命令が含まれる', () => {
      const ret = stackPush.output('test', 99);
      assert(ret.some(r => r === 'Variable(0, 42, 42, 1, 0, 1, 0)'));
    });
  });

  describe('output (length=2, 整数値)', () => {
    it('2回のpush命令が含まれる', () => {
      const ret = stackPush.output('test', 99, 2);
      const pushCmds = ret.filter(r => r === 'Variable(2, 42, 0, 0, 0, 99, 0)');
      assert(pushCmds.length === 2);
    });
    it('TOPインクリメントが2回含まれる', () => {
      const ret = stackPush.output('test', 99, 2);
      const incCmds = ret.filter(r => r === 'Variable(0, 42, 42, 1, 0, 1, 0)');
      assert(incCmds.length === 2);
    });
  });

  describe('output (変数名)', () => {
    it('変数のpush命令（valueType=1）が含まれる', () => {
      const ret = stackPush.output('test', 'val');
      // val=50: Variable(2, 42, 0, 0, 1, 50, 0)
      assert(ret.some(r => r === 'Variable(2, 42, 0, 0, 1, 50, 0)'));
    });
  });
});
