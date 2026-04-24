import assert from 'power-assert';
import InputNumber from '../../../js/util/commands/input-number.js';
import Command from '../../../js/util/command.js';
import executeLog from '../../../js/util/execute-log.js';
import tkVarManager from '../../../js/lib/tk-var-manager.js';

describe('InputNumber（数値入力の処理）', () => {
  const inputNumber = new InputNumber();
  before(() => {
    tkVarManager.setOptions({ varList: { 'test': 42 }, tmpStart: 101, tmpEnd: 200 });
  });
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(inputNumber instanceof Command);
    });
  });

  describe('JP_NAME', () => {
    it('JP_NAMEが設定されていること', () => {
      assert(inputNumber.JP_NAME === '数値入力の処理');
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(inputNumber.run(42, 4));
    });
  });

  describe('output', () => {
    it('receiveが数値の場合そのまま使われる', () => {
      const ret = inputNumber.output(42, 4);
      assert(ret[0] === 'ValueEntry(4, 42)');
    });
    it('receiveが文字列（変数名）の場合、変数番号に変換される', () => {
      const ret = inputNumber.output('test', 4);
      assert(ret[0] === 'ValueEntry(4, 42)');
    });
    it('digit引数が反映される', () => {
      const ret = inputNumber.output(10, 6);
      assert(ret[0] === 'ValueEntry(6, 10)');
    });
  });
});
