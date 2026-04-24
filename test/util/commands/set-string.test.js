import assert from 'power-assert';
import SetString from '../../../js/util/commands/set-string.js';
import Command from '../../../js/util/command.js';
import executeLog from '../../../js/util/execute-log.js';

describe('SetString（文章設定）', () => {
  const setString = new SetString();
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(setString instanceof Command);
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(setString.run('hello', 0));
    });
  });

  describe('output', () => {
    it('Name("str", num)命令を返す', () => {
      const ret = setString.output('テスト', 3);
      assert(ret[0] === 'Name("テスト", 3)');
    });
  });
});
