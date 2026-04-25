import assert from 'power-assert';
import ShowPc from '../../../js/util/commands/show-pc.js';
import Command from '../../../js/util/command.js';
import executeLog from '../../../js/util/execute-log.js';

describe('ShowPc（主人公を表示）', () => {
  const showPc = new ShowPc();
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(showPc instanceof Command);
    });
  });

  describe('JP_NAME', () => {
    it('JP_NAMEが設定されていること', () => {
      assert(showPc.JP_NAME === '主人公の透明状態変更');
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(showPc.run());
    });
  });

  describe('output', () => {
    it('Transparency(1)命令を返す', () => {
      const ret = showPc.output();
      assert(ret[0] === 'Transparency(1)');
    });
  });
});
