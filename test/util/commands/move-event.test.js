import assert from 'power-assert';
import MoveEvent from '../../../js/util/commands/move-event.js';
import Command from '../../../js/util/command.js';
import executeLog from '../../../js/util/execute-log.js';
import tkVarManager from '../../../js/lib/tk-var-manager.js';

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
