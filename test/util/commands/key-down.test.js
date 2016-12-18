const assert = require('power-assert');

const KeyDown = require('../../../js/util/commands/key-down');
const Command = require('../../../js/util/command');
const executeLog = require('../../../js/util/execute-log');

describe('keyDown(キー入力)', () => {
  const keyDown = new KeyDown();
  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(keyDown instanceof Command);
    });
  });
  describe('JP_NAME', () => {
    it('JP_NAMEがキー入力の処理であること', () => {
      assert(keyDown.JP_NAME == 'キー入力の処理');
    });
  });
  // exec
  describe('exec', () => {
    it('戻り値がtrueであること', () => {
      assert(keyDown.exec());
    });
    describe('実行ログ', () => {
      it('実行ログに記載されること', () => {
        keyDown.exec(42);
        assert(executeLog.last == '◆キー入力の処理：var[42], push[true], target[ALL]');
      });
    });
  });
  // 出力系
  // KeyEntry(receive, push, way, decision, cansel, shift, down, left, right, up)
  describe('output', () => {
    describe('最少呼び出し時', () => {
      it('キー押下待ち有り、かつ、全キー取得', () => {
        const tkCode = keyDown.output(123);
        assert(tkCode, `KeyEntry(123, 1, 1, 1, 1, 1, 1, 1, 1, 1)`);
      });
    });
  });
});
