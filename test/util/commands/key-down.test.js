const assert = require('power-assert');

const KeyEntry = require('../../../js/util/commands/key-entry');
const Command = require('../../../js/util/command');
const executeLog = require('../../../js/util/execute-log');
const tkVarManager = require('../../../js/lib/tk-var-manager');

describe('keyEntry(キー入力)', () => {
  const keyEntry = new KeyEntry();
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
      assert(keyEntry.JP_NAME == 'キー入力の処理');
    });
  });
  // exec
  describe('run', () => {
    it('戻り値がtrueであること', () => {
      assert(keyEntry.run());
    });
    describe('実行ログ', () => {
      it('キー入力が数字の場合、実行ログにそのまま記載されること', () => {
        keyEntry.run(42);
        assert(executeLog.last == '◆キー入力の処理：var[42], push[true], target[ALL]');
      });
      it('キー入力が文字列の場合、実行ログに文字列+数字で記載されること', () => {
        const varList = {
          'testVar': 45
        };
        const tmpStart = 100;
        const tmpEnd = 102;
        tkVarManager.setOptions({varList, tmpStart, tmpEnd});
        keyEntry.run('testVar');
        assert(executeLog.last == '◆キー入力の処理：var[testVar], push[true], target[ALL]');
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
