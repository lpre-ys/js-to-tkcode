import assert from 'power-assert';
import sinon from 'sinon';
import Command from '../../js/util/command.js';
import executeLog from '../../js/util/execute-log.js';


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
