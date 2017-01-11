const assert = require('power-assert');
const sinon = require('sinon');

const TkMock = require('../../js/util/tk-mock');

describe('TkMock', () => {
  let tkMock;
  beforeEach(() => {
    tkMock = new TkMock();
  });
  describe('ステータス', () => {
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
  // コマンド関係生成処理
  // key-entry.jsが存在する前提。そのうちSinonで依存切る
  describe('init', () => {
    describe('reset executeLog', () => {
      it('ログがリセットされること', () => {
        const executeLog = require('../../js/util/execute-log');
        const spy = sinon.spy(executeLog, 'reset');
        new TkMock();
        assert(spy.calledOnce);
      });
    });
    describe('commands', () => {
      it('tkMock.commands.keyEntryが存在していること', () => {
        assert(tkMock.commands.length >= 1);
      });
    });
    describe('this.function', () => {
      it('tkMock.keyEntryが存在していること', () => {
        assert(tkMock.keyEntry);
      });
      it('tkMock.keyEntryの実体が、KeyEntry.executeであること', () => {
        const spy = sinon.spy(tkMock.commands[0], 'execute');
        tkMock.keyEntry();
        assert(spy.calledOnce);
      });
    });
  });

});
