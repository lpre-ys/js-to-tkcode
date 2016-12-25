const assert = require('power-assert');

const KeyEntry = require('../../../js/util/commands/key-entry');
const Command = require('../../../js/util/command');
const executeLog = require('../../../js/util/execute-log');

describe('keyEntry(キー入力)', () => {
  const keyEntry = new KeyEntry();
  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(keyEntry instanceof Command);
    });
  });
  describe('JP_NAME', () => {
    it('JP_NAMEがキー入力の処理であること', () => {
      assert(keyEntry.JP_NAME == 'キー入力の処理');
    });
  });
  // exec
  describe('run', () => {
    it('戻り値がtrueであること', () => {
      assert(keyEntry.run());
    });
    describe('実行ログ', () => {
      it('実行ログに記載されること', () => {
        keyEntry.run(42);
        assert(executeLog.last == '◆キー入力の処理：var[42], push[true], target[ALL]');
      });
    });
  });
  // 出力系
  // KeyEntry(receive, push, way, decision, cansel, shift, down, left, right, up)
  describe('output', () => {
    describe('最少呼び出し時', () => {
      it('キー押下待ち有り、かつ、全キー取得', () => {
        const tkCode = keyEntry.output(123);
        assert(tkCode, `KeyEntry(123, 1, 1, 1, 1, 1, 1, 1, 1, 1)`);
      });
    });
  });
});
