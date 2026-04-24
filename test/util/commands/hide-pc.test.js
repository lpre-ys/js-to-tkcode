import assert from 'power-assert';
import HidePc from '../../../js/util/commands/hide-pc.js';
import Command from '../../../js/util/command.js';
import executeLog from '../../../js/util/execute-log.js';

describe('HidePc（主人公を非表示）', () => {
  const hidePc = new HidePc();
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(hidePc instanceof Command);
    });
  });

  describe('JP_NAME', () => {
    it('JP_NAMEが設定されていること', () => {
      assert(hidePc.JP_NAME === '主人公の透明状態変更');
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(hidePc.run());
    });
  });

  describe('output', () => {
    it('Transparency(0)命令を返す', () => {
      const ret = hidePc.output();
      assert(ret[0] === 'Transparency(0)');
    });
  });
});
