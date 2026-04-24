'use strict';

const assert = require('power-assert');
const SetTransition = require('../../../js/util/commands/set-transition');
const Command = require('../../../js/util/command');
const executeLog = require('../../../js/util/execute-log');

describe('SetTransition（画面切り替え方式の変更）', () => {
  const setTransition = new SetTransition();
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(setTransition instanceof Command);
    });
  });

  describe('JP_NAME', () => {
    it('JP_NAMEが設定されていること', () => {
      assert(setTransition.JP_NAME === '画面切り替え方式の変更');
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(setTransition.run(1, 1));
    });
  });

  describe('output', () => {
    it('通常の引数で正しい命令を返す', () => {
      const ret = setTransition.output(1, 2);
      assert(ret[0] === 'Screen(1, 2)');
    });
    it('effectが0/falsy相当の場合は0（フェードアウト）になる', () => {
      const ret = setTransition.output(1, 0);
      assert(ret[0] === 'Screen(1, 0)');
    });
    it('effectが未指定の場合は0になる', () => {
      const ret = setTransition.output(1);
      assert(ret[0] === 'Screen(1, 0)');
    });
  });
});
