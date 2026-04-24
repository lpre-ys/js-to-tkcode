import assert from 'power-assert';
import ShowScreen from '../../../js/util/commands/show-screen.js';
import Command from '../../../js/util/command.js';
import executeLog from '../../../js/util/execute-log.js';

describe('ShowScreen（画面の表示）', () => {
  const showScreen = new ShowScreen();
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(showScreen instanceof Command);
    });
  });

  describe('JP_NAME', () => {
    it('JP_NAMEが設定されていること', () => {
      assert(showScreen.JP_NAME === '画面の表示');
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(showScreen.run());
    });
  });

  describe('output', () => {
    it('typeが指定された場合、そのまま使われる', () => {
      const ret = showScreen.output(2);
      assert(ret[0] === 'ScreenDisplay(2)');
    });
    it('typeが未指定（falsy）の場合、-1になる', () => {
      const ret = showScreen.output();
      assert(ret[0] === 'ScreenDisplay(-1)');
    });
    it('type=0の場合も-1になる', () => {
      const ret = showScreen.output(0);
      assert(ret[0] === 'ScreenDisplay(-1)');
    });
  });
});
