import assert from 'power-assert';
import KeyEntry from '../../../js/util/commands/key-entry.js';
import Command from '../../../js/util/command.js';
import executeLog from '../../../js/util/execute-log.js';
import tkVarManager from '../../../js/lib/tk-var-manager.js';

describe('KeyEntry（キー入力の処理）', () => {
  const keyEntry = new KeyEntry();
  before(() => {
    tkVarManager.setOptions({ varList: { 'test': 42 }, tmpStart: 101, tmpEnd: 200 });
  });
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(keyEntry instanceof Command);
    });
  });

  describe('JP_NAME', () => {
    it('JP_NAMEがキー入力の処理であること', () => {
      assert(keyEntry.JP_NAME === 'キー入力の処理');
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(keyEntry.run(42));
    });
    it('実行ログに記録される', () => {
      keyEntry.run(42);
      assert(executeLog.last === '◆キー入力の処理：var[42], push[true], target[ALL]');
    });
    it('targetKeysを指定した場合ログに反映される', () => {
      keyEntry.run(42, true, ['enter', 'cancel']);
      assert(executeLog.last === '◆キー入力の処理：var[42], push[true], target[enter,cancel]');
    });
  });

  describe('output', () => {
    it('全キー取得（targetKeys=false）の場合、全て1になる', () => {
      const ret = keyEntry.output(42);
      assert(ret[0] === 'KeyEntry(42, 1, 1, 1, 1, 1, 1, 1, 1, 1)');
    });
    it('特定キーのみ取得（enter,cancel）の場合、対象のみ1になる', () => {
      // keys = ['enter', 'cancel', 'shift', 'down', 'left', 'right', 'up']
      const ret = keyEntry.output(42, true, ['enter', 'cancel']);
      assert(ret[0] === 'KeyEntry(42, 1, 1, 1, 1, 0, 0, 0, 0, 0)');
    });
    it('push=falseの場合、push引数が0になる', () => {
      const ret = keyEntry.output(42, false);
      assert(ret[0] === 'KeyEntry(42, 0, 1, 1, 1, 1, 1, 1, 1, 1)');
    });
    it('receiveが文字列（変数名）の場合、変数番号に変換される', () => {
      const ret = keyEntry.output('test');
      assert(ret[0].startsWith('KeyEntry(42,'));
    });
  });
});
