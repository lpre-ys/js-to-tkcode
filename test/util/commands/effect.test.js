'use strict';

const assert = require('power-assert');
const Effect = require('../../../js/util/commands/effect');
const Command = require('../../../js/util/command');
const executeLog = require('../../../js/util/execute-log');

describe('Effect（戦闘アニメの表示）', () => {
  const effect = new Effect();
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(effect instanceof Command);
    });
  });

  describe('JP_NAME', () => {
    it('JP_NAMEが設定されていること', () => {
      assert(effect.JP_NAME === '戦闘アニメの表示');
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(effect.run(1, 10));
    });
  });

  describe('output', () => {
    it('wait=true（デフォルト）の場合、wait引数が1になる', () => {
      const ret = effect.output(1, 10);
      assert(ret[0] === 'Anim(1, 10, 1, 0)');
    });
    it('wait=falseの場合、wait引数が0になる', () => {
      const ret = effect.output(1, 10, false);
      assert(ret[0] === 'Anim(1, 10, 0, 0)');
    });
  });
});
