import assert from 'power-assert';
import SetDbRow from '../../../js/util/commands/set-db-row.js';
import Command from '../../../js/util/command.js';
import executeLog from '../../../js/util/execute-log.js';

describe('SetDbRow（DB行設定）', () => {
  const setDbRow = new SetDbRow();
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(setDbRow instanceof Command);
    });
  });

  describe('JP_NAME', () => {
    it('JP_NAMEが設定されていること', () => {
      assert(setDbRow.JP_NAME === 'DB行設定');
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(setDbRow.run('myLabel'));
    });
  });

  describe('output', () => {
    it('id未指定の場合、ラベルのみのDB指示を返す', () => {
      const ret = setDbRow.output('myLabel');
      assert(ret === '@db: myLabel');
    });
    it('id指定の場合、ラベルとIDのDB指示を返す', () => {
      const ret = setDbRow.output('myLabel', 3);
      assert(ret === '@db: myLabel, 3');
    });
  });
});
