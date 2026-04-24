'use strict';

const assert = require('power-assert');
const ShowPicture = require('../../../js/util/commands/show-picture');
const Command = require('../../../js/util/command');
const executeLog = require('../../../js/util/execute-log');
const tkVarManager = require('../../../js/lib/tk-var-manager');

describe('ShowPicture（ピクチャーの表示）', () => {
  const showPicture = new ShowPicture();
  before(() => {
    tkVarManager.setOptions({ varList: { 'px': 100, 'py': 200 }, tmpStart: 101, tmpEnd: 300 });
  });
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(showPicture instanceof Command);
    });
  });

  describe('JP_NAME', () => {
    it('JP_NAMEが設定されていること', () => {
      assert(showPicture.JP_NAME === 'ピクチャーの表示');
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(showPicture.run('bg.png', 1));
    });
  });

  describe('output', () => {
    it('x/yが数値・isSticky=false（デフォルト）の場合', () => {
      const ret = showPicture.output('bg.png', 1, 160, 120, 0, false);
      // isSticky=0 (false), isPointVar=0 (数値)
      assert(ret[0] === 'Picture("bg.png", 1, 0, 160, 120, 0, 100, 0, 0, 100, 100, 100, 100, 0, 0)');
    });
    it('isSticky=trueの場合、第6引数が1になる', () => {
      const ret = showPicture.output('bg.png', 1, 160, 120, 0, false, 100, 100, 100, true);
      assert(ret[0] === 'Picture("bg.png", 1, 0, 160, 120, 1, 100, 0, 0, 100, 100, 100, 100, 0, 0)');
    });
    it('x/yが変数名の場合（isPointVar=1）', () => {
      const ret = showPicture.output('bg.png', 1, 'px', 'py');
      assert(ret[0] === 'Picture("bg.png", 1, 1, 100, 200, 0, 100, 0, 0, 100, 100, 100, 100, 0, 0)');
    });
  });
});
