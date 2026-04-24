'use strict';

const assert = require('power-assert');
const StopBgm = require('../../../js/util/commands/stop-bgm');
const Command = require('../../../js/util/command');
const executeLog = require('../../../js/util/execute-log');

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
