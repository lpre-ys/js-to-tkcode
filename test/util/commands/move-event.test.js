'use strict';

const assert = require('power-assert');
const MoveEvent = require('../../../js/util/commands/move-event');
const Command = require('../../../js/util/command');
const executeLog = require('../../../js/util/execute-log');
const tkVarManager = require('../../../js/lib/tk-var-manager');

describe('MoveEvent（イベント位置の設定）', () => {
  const moveEvent = new MoveEvent();
  before(() => {
    tkVarManager.setOptions({ varList: { 'posX': 10, 'posY': 20 }, tmpStart: 101, tmpEnd: 200 });
  });
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(moveEvent instanceof Command);
    });
  });

  describe('JP_NAME', () => {
    it('JP_NAMEが設定されていること', () => {
      assert(moveEvent.JP_NAME === 'イベントの位置を設定');
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(moveEvent.run(1, 5, 10));
    });
  });

  describe('output', () => {
    it('x/yが数値の場合、type=0になる', () => {
      const ret = moveEvent.output(1, 5, 10);
      assert(ret[0] === 'SetEvent(1, 0, 5, 10)');
    });
    it('xが文字列（変数名）の場合、type=1になる', () => {
      const ret = moveEvent.output(1, 'posX', 'posY');
      assert(ret[0] === 'SetEvent(1, 1, 10, 20)');
    });
  });
});
