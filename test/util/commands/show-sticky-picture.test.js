'use strict';

const assert = require('power-assert');
const ShowStickyPicture = require('../../../js/util/commands/show-sticky-picture');
const Command = require('../../../js/util/command');
const executeLog = require('../../../js/util/execute-log');
const tkVarManager = require('../../../js/lib/tk-var-manager');

describe('ShowStickyPicture（ピクチャーの表示・固定）', () => {
  const showStickyPicture = new ShowStickyPicture();
  before(() => {
    tkVarManager.setOptions({ varList: { 'px': 100, 'py': 200 }, tmpStart: 101, tmpEnd: 300 });
  });
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(showStickyPicture instanceof Command);
    });
  });

  describe('JP_NAME', () => {
    it('JP_NAMEが設定されていること', () => {
      assert(showStickyPicture.JP_NAME === 'ピクチャーの表示');
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(showStickyPicture.run('bg.png', 1));
    });
  });

  describe('output', () => {
    it('x/yが数値の場合、stickyフラグ=1で出力される', () => {
      const ret = showStickyPicture.output('bg.png', 1, 160, 120, 0, false);
      // isSticky=1（固定表示）, isPointVar=0（数値）
      assert(ret[0] === 'Picture("bg.png", 1, 0, 160, 120, 1, 100, 0, 0, 100, 100, 100, 100, 0, 0)');
    });
    it('x/yが変数名の場合（isPointVar=1）', () => {
      const ret = showStickyPicture.output('bg.png', 1, 'px', 'py');
      assert(ret[0] === 'Picture("bg.png", 1, 1, 100, 200, 1, 100, 0, 0, 100, 100, 100, 100, 0, 0)');
    });
  });
});
