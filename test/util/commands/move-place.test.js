const assert = require('power-assert');

const MovePlace = require('../../../js/util/commands/move-place');
const Command = require('../../../js/util/command');
const executeLog = require('../../../js/util/execute-log');
// const tkVarManager = require('../../../js/lib/tk-var-manager');

describe('movePlace(場所移動)', () => {
  const movePlace = new MovePlace();
  beforeEach(() => {
    executeLog.reset();
  });
  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(movePlace instanceof Command);
    });
  });
  describe('JP_NAME', () => {
    it('JP_NAMEが場所移動であること', () => {
      assert(movePlace.JP_NAME == '場所移動');
    });
  });
  // exec
  describe('run', () => {
    it('戻り値がtrueであること', () => {
      assert(movePlace.run());
    });
    describe('実行ログ', () => {
      it('実行ログに記載されること', () => {
        movePlace.run(42, 10, 15);
        assert(executeLog.last == '◆場所移動：map[42], x[10], y[15]');
      });
    });
  });
  // 出力系
  // MovePlace(map, x, y)
  describe('output', () => {
    it('通常呼び出し', () => {
      const tkCode = movePlace.output(42, 10, 15);
      assert(tkCode, `MovePlace(42, 10, 15)`);
    });
  });
});
