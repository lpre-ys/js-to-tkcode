const assert = require('power-assert');

const TkMock = require('../../js/util/tk-mock');

describe('TkMock', () => {
  let tkMock;
  describe('ステータス', () => {
    tkMock = new TkMock();
    describe('初期状態', () => {
      it('stateが存在していること', () => {
        assert(tkMock.state);
      });
      it('stateがtestであること', () => {
        assert(tkMock.state == 'test');
      });
    });
    describe('setOutputMode', () => {
      it('setOutputModeが存在していること', () => {
        assert(tkMock.setOutputMode);
      });
      it('setOutputMode実行後、アウトプットモードになること', () => {
        tkMock.setOutputMode();
        assert(tkMock.state == 'output');
      });
    });
  });
  // 一時変数
  describe('一時変数', () => {
    beforeEach(() => {
      const varList = {};
      const tmpStart = 100;
      const tmpEnd = 102;
      tkMock = new TkMock({varList, tmpStart, tmpEnd});
    });
    it('範囲内の場合、正常に取得できること', () => {
      assert(tkMock.getTmpVarNumber(1) === 101);
    });
    it('範囲外の場合、エラーになること', () => {
      assert.throws(() => {tkMock.getTmpVarNumber(3);}, Error);
    });
  });
  // 変数テーブル系
  describe('変数テーブル', () => {
    beforeEach(() => {
      const varList = {
        'test1': 42,
        'test2': 43
      };
      tkMock = new TkMock({varList});
    });
    it('存在する変数名の場合、値が返る事', () => {
      assert(tkMock.getVarNumber('test1') == 42);
      assert(tkMock.getVarNumber('test2') == 43);
    });
    it('存在しない変数名の場合、エラーになること', () => {
      assert.throws(() => {tkMock.getVarNumber('error');}, Error);
    });
  });
  // コマンド関係
  describe('◆キー入力の処理', () => {
    // const tkMock = new TkMock();
    it('TkMock.keyDownが存在していること', () => {
      // assert(TkMock.keyDown);
    });
  });

});
