'use strict';

const assert = require('power-assert');
const ActionSwitch = require('../../../js/util/commands/action-switch');
const Command = require('../../../js/util/command');
const executeLog = require('../../../js/util/execute-log');
const tkVarManager = require('../../../js/lib/tk-var-manager');

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
