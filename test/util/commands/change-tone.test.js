'use strict';

const assert = require('power-assert');
const ChangeTone = require('../../../js/util/commands/change-tone');
const Command = require('../../../js/util/command');
const executeLog = require('../../../js/util/execute-log');

describe('ChangeTone（画面の色調変更）', () => {
  const changeTone = new ChangeTone();
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(changeTone instanceof Command);
    });
  });

  describe('JP_NAME', () => {
    it('JP_NAMEが設定されていること', () => {
      assert(changeTone.JP_NAME === '画面の色調変更');
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(changeTone.run());
    });
  });

  describe('output', () => {
    it('デフォルト値で正しい命令を返す', () => {
      const ret = changeTone.output();
      assert(ret[0] === 'ScreenTone(100, 100, 100, 100, 10, 1)');
    });
    it('wait=falseの場合、wait引数が0になる', () => {
      const ret = changeTone.output(100, 100, 100, 100, 10, false);
      assert(ret[0] === 'ScreenTone(100, 100, 100, 100, 10, 0)');
    });
    it('r/g/b/s/timeが反映される', () => {
      const ret = changeTone.output(-50, -50, -50, 0, 30);
      assert(ret[0] === 'ScreenTone(-50, -50, -50, 0, 30, 1)');
    });
  });
});
