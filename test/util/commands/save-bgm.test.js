import assert from 'power-assert';
import SaveBgm from '../../../js/util/commands/save-bgm.js';
import Command from '../../../js/util/command.js';
import executeLog from '../../../js/util/execute-log.js';

describe('SaveBgm（現在のBGMを記憶）', () => {
  const saveBgm = new SaveBgm();
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(saveBgm instanceof Command);
    });
  });

  describe('JP_NAME', () => {
    it('JP_NAMEが設定されていること', () => {
      assert(saveBgm.JP_NAME === '現在のBGMを記憶');
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(saveBgm.run());
    });
  });

  describe('output', () => {
    it('StoreBGM命令を返す', () => {
      const ret = saveBgm.output();
      assert(ret[0] === 'StoreBGM');
    });
  });
});
