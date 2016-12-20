const assert = require('power-assert');

const tkVarManager = require('../../js/lib/tk-var-manager');

describe('TkVarManager', () => {
  // 一時変数
  describe('一時変数', () => {
    beforeEach(() => {
      const varList = {};
      const tmpStart = 100;
      const tmpEnd = 102;
      tkVarManager.setOptions({varList, tmpStart, tmpEnd});
    });
    it('範囲内の場合、正常に取得できること', () => {
      assert(tkVarManager.getTmpVarNumber(1) === 101);
    });
    it('範囲外の場合、エラーになること', () => {
      assert.throws(() => {tkVarManager.getTmpVarNumber(3);}, Error);
    });
  });
  // 変数テーブル系
  describe('変数テーブル', () => {
    beforeEach(() => {
      const varList = {
        'test1': 42,
        'test2': 43
      };
      tkVarManager.setOptions({varList});
    });
    it('存在する変数名の場合、値が返る事', () => {
      assert(tkVarManager.getVarNumber('test1') == 42);
      assert(tkVarManager.getVarNumber('test2') == 43);
    });
    it('存在しない変数名の場合、エラーになること', () => {
      assert.throws(() => {tkVarManager.getVarNumber('error');}, Error);
    });
  });
});
