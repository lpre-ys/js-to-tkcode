'use strict';

const assert = require('power-assert');
const AddMember = require('../../../js/util/commands/add-member');
const Command = require('../../../js/util/command');
const executeLog = require('../../../js/util/execute-log');

describe('AddMember（メンバーの入れ替え・追加）', () => {
  const addMember = new AddMember();
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(addMember instanceof Command);
    });
  });

  describe('JP_NAME', () => {
    it('JP_NAMEが設定されていること', () => {
      assert(addMember.JP_NAME === 'メンバーの入れ替え');
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(addMember.run(1));
    });
  });

  describe('output', () => {
    it('Member(0, 0, member)命令を返す', () => {
      const ret = addMember.output(3);
      assert(ret[0] === 'Member(0, 0, 3)');
    });
  });
});
