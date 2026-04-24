'use strict';

const assert = require('power-assert');
const ChangeBg = require('../../../js/util/commands/change-bg');
const Command = require('../../../js/util/command');
const executeLog = require('../../../js/util/execute-log');

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
