import assert from 'power-assert';
import QueueInit from '../../../../js/util/commands/queue/queue-init.js';
import Command from '../../../../js/util/command.js';
import executeLog from '../../../../js/util/execute-log.js';
import tkVarManager from '../../../../js/lib/tk-var-manager.js';

describe('QueueInit', () => {
  const queueInit = new QueueInit();
  before(() => {
    tkVarManager.setOptions({ varList: { 'test': 42 }, tmpStart: 101, tmpEnd: 200 });
  });
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(queueInit instanceof Command);
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(queueInit.run('test', 5));
    });
  });

  describe('output', () => {
    it('全体リセット命令が出力される', () => {
      const ret = queueInit.output('test', 5);
      // base=42, max=5 → base+max+4=51
      assert(ret[0] === 'Variable(1, 42, 51, 0, 0, 0, 0)');
    });
    it('headの初期化命令が出力される', () => {
      const ret = queueInit.output('test', 5);
      // head = base+4 = 46
      assert(ret[1] === 'Variable(0, 42, 42, 0, 0, 46, 0)');
    });
    it('tailの初期化命令が出力される', () => {
      const ret = queueInit.output('test', 5);
      // tail = base+1=43, base+4=46
      assert(ret[2] === 'Variable(0, 43, 43, 0, 0, 46, 0)');
    });
    it('maxの初期化命令が出力される', () => {
      const ret = queueInit.output('test', 5);
      // max = base+2=44, max+1=6
      assert(ret[3] === 'Variable(0, 44, 44, 0, 0, 6, 0)');
    });
    it('合計4命令が出力される', () => {
      const ret = queueInit.output('test', 5);
      assert(ret.length === 4);
    });
  });
});
