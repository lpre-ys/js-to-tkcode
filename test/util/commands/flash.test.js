'use strict';

const assert = require('power-assert');
const Flash = require('../../../js/util/commands/flash');
const Command = require('../../../js/util/command');
const executeLog = require('../../../js/util/execute-log');

describe('Flash（画面のフラッシュ）', () => {
  const flash = new Flash();
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(flash instanceof Command);
    });
  });

  describe('JP_NAME', () => {
    it('JP_NAMEが設定されていること', () => {
      assert(flash.JP_NAME === '画面のフラッシュ');
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(flash.run(31, 31, 31));
    });
  });

  describe('output', () => {
    it('wait=true（デフォルト）の場合、wait引数が1になる', () => {
      const ret = flash.output(31, 31, 31);
      assert(ret[0] === 'ScreenFlash(31, 31, 31, 31, 5, 1)');
    });
    it('wait=falseの場合、wait引数が0になる', () => {
      const ret = flash.output(31, 31, 31, 31, 5, false);
      assert(ret[0] === 'ScreenFlash(31, 31, 31, 31, 5, 0)');
    });
    it('r/g/b/volume/timeが反映される', () => {
      const ret = flash.output(10, 20, 30, 15, 3);
      assert(ret[0] === 'ScreenFlash(10, 20, 30, 15, 3, 1)');
    });
  });
});
