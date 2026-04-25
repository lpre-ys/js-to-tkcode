import assert from 'power-assert';
import LoadBgm from '../../../js/util/commands/load-bgm.js';
import Command from '../../../js/util/command.js';
import executeLog from '../../../js/util/execute-log.js';

describe('LoadBgm（記憶したBGMを演奏）', () => {
  const loadBgm = new LoadBgm();
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(loadBgm instanceof Command);
    });
  });

  describe('JP_NAME', () => {
    it('JP_NAMEが設定されていること', () => {
      assert(loadBgm.JP_NAME === '記憶したBGMを演奏');
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(loadBgm.run());
    });
  });

  describe('output', () => {
    it('PlayStoredBGM命令を返す', () => {
      const ret = loadBgm.output();
      assert(ret[0] === 'PlayStoredBGM');
    });
  });
});
