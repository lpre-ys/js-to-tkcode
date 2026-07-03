import assert from 'power-assert';
import Save from '../../../js/util/commands/save.js';
import Command from '../../../js/util/command.js';
import executeLog from '../../../js/util/execute-log.js';

describe('Save（セーブ画面の呼び出し）', () => {
  const save = new Save();
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(save instanceof Command);
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(save.run());
    });
  });

  describe('output', () => {
    it('Save命令を返す', () => {
      const ret = save.output();
      assert(ret[0] === 'Save');
    });
  });
});
