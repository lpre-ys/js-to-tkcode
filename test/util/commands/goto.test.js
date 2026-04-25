import assert from 'power-assert';
import Goto from '../../../js/util/commands/goto.js';
import Command from '../../../js/util/command.js';
import executeLog from '../../../js/util/execute-log.js';

describe('Goto（指定ラベルへ飛ぶ）', () => {
  const goto = new Goto();
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(goto instanceof Command);
    });
  });

  describe('JP_NAME', () => {
    it('JP_NAMEが設定されていること', () => {
      assert(goto.JP_NAME === '指定ラベルへ飛ぶ');
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(goto.run(1));
    });
  });

  describe('output', () => {
    it('LabelJump(label)命令を返す', () => {
      const ret = goto.output(3);
      assert(ret[0] === 'LabelJump(3)');
    });
  });
});
