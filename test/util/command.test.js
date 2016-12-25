const assert = require('power-assert');
const sinon = require('sinon');

const Command = require('../../js/util/command');
const executeLog = require('../../js/util/execute-log');

describe('Command', () => {
  const command = new Command();
  describe('execute', () => {
    it('execモード時、テストメソッドを返すこと', () => {
      const spy = sinon.spy(command, "run");
      command.mode = 'exec';
      command.execute();
      assert(spy.calledOnce);
    });
    it('outputモード時、出力用メソッドを返すこと', () => {
      const spy = sinon.spy(command, 'output');
      command.mode = 'output';
      command.execute();
      assert(spy.calledOnce);
    });
  });
  describe('executeLog', () => {
    it('executeLogパラメータをもっていること', () => {
      assert(command.executeLog);
    });
  });
  describe('JP_NAME', () => {
    it('JP_NAMEがTODOであること', () => {
      assert(command.JP_NAME == 'TODO');
    });
  });
  describe('writeLog', () => {
    it('正しいフォーマットで記載されること', () => {
      command.writeLog('test message');
      assert(executeLog.last == '◆TODO：test message');
    });
  });
});
