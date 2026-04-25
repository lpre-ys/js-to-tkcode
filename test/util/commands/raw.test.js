import assert from 'power-assert';
import Raw from '../../../js/util/commands/raw.js';
import Command from '../../../js/util/command.js';
import executeLog from '../../../js/util/execute-log.js';

describe('Raw（生コマンド）', () => {
  const raw = new Raw();
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(raw instanceof Command);
    });
  });

  describe('JP_NAME', () => {
    it('JP_NAMEが設定されていること', () => {
      assert(raw.JP_NAME === '生コマンド');
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(raw.run('SomeCmd'));
    });
  });

  describe('output', () => {
    it('文字列の場合、1要素の配列で返す', () => {
      const ret = raw.output('SomeCmd(1, 2)');
      assert(Array.isArray(ret));
      assert(ret.length === 1);
      assert(ret[0] === 'SomeCmd(1, 2)');
    });
    it('配列の場合、そのまま返す', () => {
      const cmds = ['Cmd1', 'Cmd2', 'Cmd3'];
      const ret = raw.output(cmds);
      assert(ret === cmds);
      assert(ret.length === 3);
    });
  });
});
