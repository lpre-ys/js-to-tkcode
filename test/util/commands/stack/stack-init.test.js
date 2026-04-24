import assert from 'power-assert';
import StackInit from '../../../../js/util/commands/stack/stack-init.js';
import Command from '../../../../js/util/command.js';
import executeLog from '../../../../js/util/execute-log.js';
import tkVarManager from '../../../../js/lib/tk-var-manager.js';

describe('StackInit', () => {
  const stackInit = new StackInit();
  before(() => {
    tkVarManager.setOptions({ varList: { 'test': 42 }, tmpStart: 101, tmpEnd: 200 });
  });
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(stackInit instanceof Command);
    });
  });

  describe('JP_NAME', () => {
    it('JP_NAMEが設定されていること', () => {
      assert(stackInit.JP_NAME === 'SET:stack-init');
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(stackInit.run('test', 5));
    });
  });

  describe('output', () => {
    it('TOPの初期化命令が出力される', () => {
      const ret = stackInit.output('test', 5);
      // base=42, base+2=44: Variable(0, 42, 42, 0, 0, 44, 0)
      assert(ret[0] === 'Variable(0, 42, 42, 0, 0, 44, 0)');
    });
    it('MAXの初期化命令が出力される', () => {
      const ret = stackInit.output('test', 5);
      // base+1=43, base+2+max=49: Variable(0, 43, 43, 0, 0, 49, 0)
      assert(ret[1] === 'Variable(0, 43, 43, 0, 0, 49, 0)');
    });
    it('values範囲のリセット命令が出力される', () => {
      const ret = stackInit.output('test', 5);
      // base+2=44 to base+2+max-1=48: Variable(1, 44, 48, 0, 0, 0, 0)
      assert(ret[2] === 'Variable(1, 44, 48, 0, 0, 0, 0)');
    });
    it('合計3命令が出力される', () => {
      const ret = stackInit.output('test', 5);
      assert(ret.length === 3);
    });
  });
});
