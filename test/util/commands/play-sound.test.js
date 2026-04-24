'use strict';

const assert = require('power-assert');
const PlaySound = require('../../../js/util/commands/play-sound');
const Command = require('../../../js/util/command');
const executeLog = require('../../../js/util/execute-log');

describe('PlaySound（効果音の演奏）', () => {
  const playSound = new PlaySound();
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(playSound instanceof Command);
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(playSound.run('se.wav'));
    });
  });

  describe('output', () => {
    it('デフォルト値で正しい命令を返す', () => {
      const ret = playSound.output('se.wav');
      assert(ret[0] === 'PlaySE("se.wav", 100, 100, 50)');
    });
    it('volume/tempo/balanceが反映される', () => {
      const ret = playSound.output('se.wav', 80, 90, 40);
      assert(ret[0] === 'PlaySE("se.wav", 80, 90, 40)');
    });
  });
});
