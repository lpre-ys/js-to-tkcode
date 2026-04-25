import assert from 'power-assert';
import EventFlash from '../../../js/util/commands/event-flash.js';
import Command from '../../../js/util/command.js';
import executeLog from '../../../js/util/execute-log.js';

describe('EventFlash（キャラクターのフラッシュ）', () => {
  const eventFlash = new EventFlash();
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(eventFlash instanceof Command);
    });
  });

  describe('JP_NAME', () => {
    it('JP_NAMEが設定されていること', () => {
      assert(eventFlash.JP_NAME === 'キャラクターのフラッシュ');
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(eventFlash.run(10001));
    });
  });

  describe('output', () => {
    it('wait=true（デフォルト）の場合、wait引数が1になる', () => {
      const ret = eventFlash.output(10001);
      assert(ret[0] === 'CharacterFlash(10001, 31, 31, 31, 31, 5, 1)');
    });
    it('wait=falseの場合、wait引数が0になる', () => {
      const ret = eventFlash.output(10001, 31, 31, 31, 31, 5, false);
      assert(ret[0] === 'CharacterFlash(10001, 31, 31, 31, 31, 5, 0)');
    });
    it('r/g/b/volume/timeが反映される', () => {
      const ret = eventFlash.output(10001, 20, 10, 5, 25, 8);
      assert(ret[0] === 'CharacterFlash(10001, 20, 10, 5, 25, 8, 1)');
    });
  });
});
