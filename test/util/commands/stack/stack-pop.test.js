import assert from 'power-assert';
import StackPop from '../../../../js/util/commands/stack/stack-pop.js';
import Command from '../../../../js/util/command.js';
import executeLog from '../../../../js/util/execute-log.js';
import tkVarManager from '../../../../js/lib/tk-var-manager.js';
import tmpVarFactory from '../../../../js/lib/tmp-var-factory.js';

describe('StackPop', () => {
  const stackPop = new StackPop();
  before(() => {
    tkVarManager.setOptions({ varList: { 'test': 42, 'ret': 60 }, tmpStart: 101, tmpEnd: 200 });
  });
  beforeEach(() => {
    executeLog.reset();
    tmpVarFactory.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(stackPop instanceof Command);
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(stackPop.run('test', 'ret'));
    });
  });

  describe('output (length=1)', () => {
    it('isEmptyチェックのIf命令が先頭に出力される', () => {
      const ret = stackPop.output('test', 'ret');
      // base=42, base+2+1-1=44: If(01, 42, 0, 44, 2, 1)
      assert(ret[0] === 'If(01, 42, 0, 44, 2, 1)');
    });
    it('Else/EndIfが含まれる', () => {
      const ret = stackPop.output('test', 'ret');
      assert(ret.includes('Else'));
      assert(ret.includes('EndIf'));
    });
    it('TOPデクリメント命令が含まれる', () => {
      const ret = stackPop.output('test', 'ret');
      assert(ret.some(r => r === 'Variable(0, 42, 42, 2, 0, 1, 0)'));
    });
    it('pop値の代入命令が含まれる', () => {
      const ret = stackPop.output('test', 'ret');
      // retVar=60: Variable(0, 60, 60, 0, 2, 42, 0)
      assert(ret.some(r => r === 'Variable(0, 60, 60, 0, 2, 42, 0)'));
    });
  });

  describe('output (length=2)', () => {
    it('TOPデクリメントが2回含まれる', () => {
      const ret = stackPop.output('test', 'ret', 2);
      const decCmds = ret.filter(r => r === 'Variable(0, 42, 42, 2, 0, 1, 0)');
      assert(decCmds.length === 2);
    });
    it('逆順で代入される（ret+1が先、ret+0が後）', () => {
      const ret = stackPop.output('test', 'ret', 2);
      // length=2: i=0 → retVar+2-0-1=61, i=1 → retVar+2-1-1=60
      const popCmds = ret.filter(r => r.startsWith('Variable(0, ') && r.includes(', 2, 42,'));
      assert(popCmds[0] === 'Variable(0, 61, 61, 0, 2, 42, 0)');
      assert(popCmds[1] === 'Variable(0, 60, 60, 0, 2, 42, 0)');
    });
  });
});
