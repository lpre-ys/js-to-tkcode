import assert from 'power-assert';
import StopBgm from '../../../js/util/commands/stop-bgm.js';
import Command from '../../../js/util/command.js';
import executeLog from '../../../js/util/execute-log.js';

describe('StopBgm（BGMの停止）', () => {
  const stopBgm = new StopBgm();
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(stopBgm instanceof Command);
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(stopBgm.run());
    });
  });

  describe('output', () => {
    it('PlayBGM("(OFF)", ...)命令を返す', () => {
      const ret = stopBgm.output();
      assert(ret[0] === 'PlayBGM("(OFF)", 0, 100, 100, 50)');
    });
  });
});
