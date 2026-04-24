'use strict';

const assert = require('power-assert');
const Goto = require('../../../js/util/commands/goto');
const Command = require('../../../js/util/command');
const executeLog = require('../../../js/util/execute-log');

describe('Goto（指定ラベルへ飛ぶ）', () => {
  const goto = new Goto();
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(goto instanceof Command);
    });
  });

  describe('JP_NAME', () => {
    it('JP_NAMEが設定されていること', () => {
      assert(goto.JP_NAME === '指定ラベルへ飛ぶ');
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(goto.run(1));
    });
  });

  describe('output', () => {
    it('LabelJump(label)命令を返す', () => {
      const ret = goto.output(3);
      assert(ret[0] === 'LabelJump(3)');
    });
  });
});
