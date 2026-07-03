import assert from 'power-assert';
import AllowMenu from '../../../js/util/commands/allow-menu.js';
import Command from '../../../js/util/command.js';
import executeLog from '../../../js/util/execute-log.js';

describe('AllowMenu（メニュー画面禁止の変更）', () => {
  const allowMenu = new AllowMenu();
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(allowMenu instanceof Command);
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(allowMenu.run());
    });
  });

  describe('output', () => {
    it('デフォルト(allow=true)の場合、MenuProhibition(1)になる', () => {
      const ret = allowMenu.output();
      assert(ret[0] === 'MenuProhibition(1)');
    });
    it('allow=trueの場合、MenuProhibition(1)になる（許可）', () => {
      const ret = allowMenu.output(true);
      assert(ret[0] === 'MenuProhibition(1)');
    });
    it('allow=falseの場合、MenuProhibition(0)になる（禁止）', () => {
      const ret = allowMenu.output(false);
      assert(ret[0] === 'MenuProhibition(0)');
    });
  });
});
