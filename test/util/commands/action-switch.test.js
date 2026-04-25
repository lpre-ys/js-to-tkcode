import assert from 'power-assert';
import ActionSwitch from '../../../js/util/commands/action-switch.js';
import Command from '../../../js/util/command.js';
import executeLog from '../../../js/util/execute-log.js';
import tkVarManager from '../../../js/lib/tk-var-manager.js';

describe('ActionSwitch（アクション・スイッチ）', () => {
  const actionSwitch = new ActionSwitch();
  before(() => {
    tkVarManager.setOptions({ varList: { 'test': 42 }, tmpStart: 101, tmpEnd: 200 });
  });
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(actionSwitch instanceof Command);
    });
  });

  describe('JP_NAME', () => {
    it('JP_NAMEが設定されていること', () => {
      assert(actionSwitch.JP_NAME === 'アクション(スイッチ)');
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(actionSwitch.run(42, true));
    });
  });

  describe('output', () => {
    it('value=trueの場合、actionId=32になる', () => {
      const ret = actionSwitch.output('test', true);
      assert(ret[0] === 'SubAct(32, 42)');
    });
    it('value=falseの場合、actionId=33になる', () => {
      const ret = actionSwitch.output('test', false);
      assert(ret[0] === 'SubAct(33, 42)');
    });
  });
});
