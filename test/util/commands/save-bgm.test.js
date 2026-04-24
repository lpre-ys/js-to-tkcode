'use strict';

const assert = require('power-assert');
const SaveBgm = require('../../../js/util/commands/save-bgm');
const Command = require('../../../js/util/command');
const executeLog = require('../../../js/util/execute-log');

describe('SaveBgm（現在のBGMを記憶）', () => {
  const saveBgm = new SaveBgm();
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(saveBgm instanceof Command);
    });
  });

  describe('JP_NAME', () => {
    it('JP_NAMEが設定されていること', () => {
      assert(saveBgm.JP_NAME === '現在のBGMを記憶');
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(saveBgm.run());
    });
  });

  describe('output', () => {
    it('StoreBGM命令を返す', () => {
      const ret = saveBgm.output();
      assert(ret[0] === 'StoreBGM');
    });
  });
});
