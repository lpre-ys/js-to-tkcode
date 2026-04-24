'use strict';

const assert = require('power-assert');
const SetDbRow = require('../../../js/util/commands/set-db-row');
const Command = require('../../../js/util/command');
const executeLog = require('../../../js/util/execute-log');

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
