import assert from 'power-assert';
import QueueRevert from '../../../../js/util/commands/queue/queue-revert.js';
import Command from '../../../../js/util/command.js';
import executeLog from '../../../../js/util/execute-log.js';
import tkVarManager from '../../../../js/lib/tk-var-manager.js';

describe('QueueRevert', () => {
  const queueRevert = new QueueRevert();
  before(() => {
    tkVarManager.setOptions({ varList: { 'test': 42 }, tmpStart: 101, tmpEnd: 200 });
  });
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(queueRevert instanceof Command);
    });
  });

  describe('JP_NAME', () => {
    it('JP_NAMEが設定されていること', () => {
      assert(queueRevert.JP_NAME === 'Queue:revert');
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(queueRevert.run('test'));
    });
  });

  describe('output', () => {
    it('isEmptyチェックのIf命令が先頭に出力される', () => {
      const ret = queueRevert.output('test');
      // base=42, base+1=43: If(01, 42, 1, 43, 5, 0)
      assert(ret[0] === 'If(01, 42, 1, 43, 5, 0)');
    });
    it('Else/EndIfが含まれる', () => {
      const ret = queueRevert.output('test');
      assert(ret.includes('Else'));
      assert(ret.includes('EndIf'));
    });
    it('tailを戻す命令（減算）が含まれる', () => {
      const ret = queueRevert.output('test');
      // tail--: Variable(0, base+1=43, 43, 2, 0, 1, 0)
      assert(ret.some(r => r === 'Variable(0, 43, 43, 2, 0, 1, 0)'));
    });
    it('tail=0の場合のリセット命令が含まれる', () => {
      const ret = queueRevert.output('test');
      // tail to last: Variable(0, base+1=43, 43, 0, 1, base+3=45, 0)
      assert(ret.some(r => r === 'Variable(0, 43, 43, 0, 1, 45, 0)'));
    });
  });
});
