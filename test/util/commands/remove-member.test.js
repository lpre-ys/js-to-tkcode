'use strict';

const assert = require('power-assert');
const RemoveMember = require('../../../js/util/commands/remove-member');
const Command = require('../../../js/util/command');
const executeLog = require('../../../js/util/execute-log');

describe('RemoveMember（メンバーの入れ替え・削除）', () => {
  const removeMember = new RemoveMember();
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(removeMember instanceof Command);
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(removeMember.run(1));
    });
  });

  describe('output', () => {
    it('Member(1, 0, member)命令を返す', () => {
      const ret = removeMember.output(3);
      assert(ret[0] === 'Member(1, 0, 3)');
    });
  });
});
