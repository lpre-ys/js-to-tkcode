import assert from 'power-assert';
import RemoveMember from '../../../js/util/commands/remove-member.js';
import Command from '../../../js/util/command.js';
import executeLog from '../../../js/util/execute-log.js';

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
