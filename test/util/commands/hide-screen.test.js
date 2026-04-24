'use strict';

const assert = require('power-assert');
const HideScreen = require('../../../js/util/commands/hide-screen');
const Command = require('../../../js/util/command');
const executeLog = require('../../../js/util/execute-log');

describe('HideScreen（画面の消去）', () => {
  const hideScreen = new HideScreen();
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(hideScreen instanceof Command);
    });
  });

  describe('JP_NAME', () => {
    it('JP_NAMEが設定されていること', () => {
      assert(hideScreen.JP_NAME === '画面の消去');
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(hideScreen.run());
    });
  });

  describe('output', () => {
    it('typeが指定された場合、そのまま使われる', () => {
      const ret = hideScreen.output(2);
      assert(ret[0] === 'ScreenDel(2)');
    });
    it('typeが未指定（falsy）の場合、-1になる', () => {
      const ret = hideScreen.output();
      assert(ret[0] === 'ScreenDel(-1)');
    });
    it('type=0の場合も-1になる', () => {
      const ret = hideScreen.output(0);
      assert(ret[0] === 'ScreenDel(-1)');
    });
  });
});
