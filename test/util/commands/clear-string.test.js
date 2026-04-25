import assert from 'power-assert';
import ClearString from '../../../js/util/commands/clear-string.js';
import Command from '../../../js/util/command.js';
import executeLog from '../../../js/util/execute-log.js';

describe('ClearString（文章クリア）', () => {
  const clearString = new ClearString();
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(clearString instanceof Command);
    });
  });

  describe('JP_NAME', () => {
    it('JP_NAMEが設定されていること', () => {
      assert(clearString.JP_NAME === '文章(クリア)');
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(clearString.run(0));
    });
  });

  describe('output', () => {
    it('length=1（デフォルト）の場合1命令を返す', () => {
      const ret = clearString.output(3);
      assert(ret.length === 1);
      assert(ret[0] === 'Name("", 3)');
    });
    it('length=3の場合3命令を返す（連番）', () => {
      const ret = clearString.output(5, 3);
      assert(ret.length === 3);
      assert(ret[0] === 'Name("", 5)');
      assert(ret[1] === 'Name("", 6)');
      assert(ret[2] === 'Name("", 7)');
    });
  });
});
