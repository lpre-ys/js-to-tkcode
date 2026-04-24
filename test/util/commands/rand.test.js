'use strict';

const assert = require('power-assert');
const Rand = require('../../../js/util/commands/rand');
const Command = require('../../../js/util/command');
const executeLog = require('../../../js/util/execute-log');
const tkVarManager = require('../../../js/lib/tk-var-manager');

describe('Rand（乱数生成）', () => {
  const rand = new Rand();
  before(() => {
    tkVarManager.setOptions({ varList: { 'test': 42 }, tmpStart: 101, tmpEnd: 200 });
  });
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(rand instanceof Command);
    });
  });

  describe('JP_NAME', () => {
    it('JP_NAMEが設定されていること', () => {
      assert(rand.JP_NAME === '変数の操作(乱数)');
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(rand.run(42, 1, 10));
    });
  });

  describe('output', () => {
    it('receiveが数値の場合そのまま使われる', () => {
      const ret = rand.output(42, 1, 10);
      assert(ret[0] === 'Variable(0, 42, 42, 0, 3, 1, 10)');
    });
    it('receiveが文字列（変数名）の場合、変数番号に変換される', () => {
      const ret = rand.output('test', 0, 100);
      assert(ret[0] === 'Variable(0, 42, 42, 0, 3, 0, 100)');
    });
    it('min/maxが反映される', () => {
      const ret = rand.output(5, 50, 99);
      assert(ret[0] === 'Variable(0, 5, 5, 0, 3, 50, 99)');
    });
  });
});
