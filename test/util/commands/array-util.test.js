'use strict';

const assert = require('power-assert');
const ArrayUtil = require('../../../js/util/commands/array-util');
const Command = require('../../../js/util/command');
const executeLog = require('../../../js/util/execute-log');
const tkVarManager = require('../../../js/lib/tk-var-manager');
const tmpVarFactory = require('../../../js/lib/tmp-var-factory');

describe('ArrayUtil（変数の操作・配列代入）', () => {
  const arrayUtil = new ArrayUtil();
  before(() => {
    tkVarManager.setOptions({ varList: { 'arr': 10, 'val': 20, 'idx': 30 }, tmpStart: 101, tmpEnd: 200 });
  });
  beforeEach(() => {
    executeLog.reset();
    tmpVarFactory.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(arrayUtil instanceof Command);
    });
  });

  describe('JP_NAME', () => {
    it('JP_NAMEが設定されていること', () => {
      assert(arrayUtil.JP_NAME === '変数の操作(配列代入)');
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(arrayUtil.run('arr', 0, 'val', 0));
    });
  });

  describe('output', () => {
    describe('baseIndex=数値, valueIndex=数値（リテラルxリテラル）', () => {
      it('targetType=0, valueType=0のVariable命令が出力される', () => {
        const ret = arrayUtil.output('arr', 2, 'val', 3);
        // base=10+2=12, value=20+3=23
        assert(ret[ret.length - 1] === 'Variable(0, 12, 12, 0, 0, 23, 0)');
      });
      it('tmpVar命令が含まれない', () => {
        const ret = arrayUtil.output('arr', 0, 'val', 0);
        assert(ret.length === 1);
      });
    });

    describe('baseIndex=変数名, valueIndex=数値（変数xリテラル）', () => {
      it('tmpVarをbaseIndexに使い、targetType=2が出力される', () => {
        const ret = arrayUtil.output('arr', 'idx', 'val', 0);
        // tmpBaseIndex=101(tmpStart+0)
        // Variable(0, 101, 101, 0, 1, 30, 0) ← idx変数のコピー
        // Variable(0, 101, 101, 1, 0, 10, 0) ← base(arr)を加算
        // Variable(2, 101, 0, 0, 0, 20, 0)  ← targetType=2, value=20+0=20
        assert(ret[0] === 'Variable(0, 101, 101, 0, 1, 30, 0)');
        assert(ret[1] === 'Variable(0, 101, 101, 1, 0, 10, 0)');
        assert(ret[ret.length - 1] === 'Variable(2, 101, 0, 0, 0, 20, 0)');
      });
    });

    describe('baseIndex=数値, valueIndex=変数名（リテラルx変数）', () => {
      it('tmpVarをvalueIndexに使い、valueType=2が出力される', () => {
        const ret = arrayUtil.output('arr', 0, 'val', 'idx');
        // base=10+0=10, tmpValueIndex=getTmpVarNumber(1)=102
        // Variable(0, 102, 102, 0, 1, 30, 0)
        // Variable(0, 102, 102, 1, 0, 20, 0)
        // Variable(0, 10, 10, 0, 2, 102, 0)
        assert(ret[0] === 'Variable(0, 102, 102, 0, 1, 30, 0)');
        assert(ret[1] === 'Variable(0, 102, 102, 1, 0, 20, 0)');
        assert(ret[ret.length - 1] === 'Variable(0, 10, 10, 0, 2, 102, 0)');
      });
    });

    describe('baseIndex=変数名, valueIndex=変数名（変数x変数）', () => {
      it('tmpVarを両方に使い、targetType=2かつvalueType=2が出力される', () => {
        const ret = arrayUtil.output('arr', 'idx', 'val', 'idx');
        // tmpBaseIndex=101, tmpValueIndex=102
        assert(ret.some(r => r === 'Variable(0, 101, 101, 0, 1, 30, 0)'));
        assert(ret.some(r => r === 'Variable(0, 101, 101, 1, 0, 10, 0)'));
        assert(ret.some(r => r === 'Variable(0, 102, 102, 0, 1, 30, 0)'));
        assert(ret.some(r => r === 'Variable(0, 102, 102, 1, 0, 20, 0)'));
        assert(ret[ret.length - 1] === 'Variable(2, 101, 0, 0, 2, 102, 0)');
      });
    });
  });
});
