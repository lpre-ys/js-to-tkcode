import assert from 'power-assert';
import ResetFace from '../../../js/util/commands/reset-face.js';
import Command from '../../../js/util/command.js';
import executeLog from '../../../js/util/execute-log.js';

describe('ResetFace（顔グラフィックの変更・無し）', () => {
  const resetFace = new ResetFace();
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(resetFace instanceof Command);
    });
  });

  describe('JP_NAME', () => {
    it('JP_NAMEが設定されていること', () => {
      assert(resetFace.JP_NAME === '顔グラフィックの変更(無し)');
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(resetFace.run());
    });
  });

  describe('output', () => {
    it('Faice(0, 0, 0)命令を返す', () => {
      const ret = resetFace.output();
      assert(ret[0] === 'Faice(0, 0, 0)');
    });
  });
});
