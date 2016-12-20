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
  // コマンド関係
  describe('◆キー入力の処理', () => {
    // const tkMock = new TkMock();
    it('TkMock.keyDownが存在していること', () => {
      // assert(TkMock.keyDown);
    });
  });

});
