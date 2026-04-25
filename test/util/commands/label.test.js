import assert from 'power-assert';
import Label from '../../../js/util/commands/label.js';
import Command from '../../../js/util/command.js';
import executeLog from '../../../js/util/execute-log.js';

describe('Label（ラベルの設定）', () => {
  const label = new Label();
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(label instanceof Command);
    });
  });

  describe('JP_NAME', () => {
    it('JP_NAMEが設定されていること', () => {
      assert(label.JP_NAME === 'ラベルの設定');
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(label.run(1));
    });
  });

  describe('output', () => {
    it('Label(label)命令を返す', () => {
      const ret = label.output(3);
      assert(ret[0] === 'Label(3)');
    });
  });
});
