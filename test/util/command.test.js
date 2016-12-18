const assert = require('power-assert');

const Command = require('../../js/util/command');
const executeLog = require('../../js/util/execute-log');

describe('Command', () => {
  const command = new Command();
  describe('getMethod', () => {
    it('execモード時、テストメソッドを返すこと', () => {
      command.mode = 'exec';
      assert(command.getMethod().name == 'exec');
    });
    it('outputモード時、出力用メソッドを返すこと', () => {
      command.mode = 'output';
      assert(command.getMethod().name == 'output');
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
