import assert from 'power-assert';
import ChangeBg from '../../../js/util/commands/change-bg.js';
import Command from '../../../js/util/command.js';
import executeLog from '../../../js/util/execute-log.js';

describe('ChangeBg（遠景の変更）', () => {
  const changeBg = new ChangeBg();
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(changeBg instanceof Command);
    });
  });

  describe('JP_NAME', () => {
    it('JP_NAMEが設定されていること', () => {
      assert(changeBg.JP_NAME === '遠景の変更');
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(changeBg.run('sky.png'));
    });
  });

  describe('output', () => {
    it('Panorama命令を返す', () => {
      const ret = changeBg.output('sky.png');
      assert(ret[0] === 'Panorama("sky.png", 0, 0, 0, 0, 0, 0)');
    });
  });
});
