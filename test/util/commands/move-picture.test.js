import assert from 'power-assert';
import MovePicture from '../../../js/util/commands/move-picture.js';
import Command from '../../../js/util/command.js';
import executeLog from '../../../js/util/execute-log.js';
import tkVarManager from '../../../js/lib/tk-var-manager.js';

describe('MovePicture（ピクチャーの移動）', () => {
  const movePicture = new MovePicture();
  before(() => {
    tkVarManager.setOptions({ varList: { 'px': 100, 'py': 200 }, tmpStart: 101, tmpEnd: 300 });
  });
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(movePicture instanceof Command);
    });
  });

  describe('JP_NAME', () => {
    it('JP_NAMEが設定されていること', () => {
      assert(movePicture.JP_NAME === 'ピクチャーの移動');
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(movePicture.run(1));
    });
  });

  describe('output', () => {
    it('x/yが数値の場合（isPointVar=false）、第2引数が0になる', () => {
      const ret = movePicture.output(1, 160, 120, 0, false, 0, false);
      assert(ret[0] === 'PictureMove(1, 0, 160, 120, 0, 100, 0, 0, 100, 100, 100, 100, 0, 0, 0, 0)');
    });
    it('x/yが変数名の場合（isPointVar=true）、第2引数が1になる', () => {
      const ret = movePicture.output(1, 'px', 'py', 0, false, 10, true);
      assert(ret[0] === 'PictureMove(1, 1, 100, 200, 0, 100, 0, 0, 100, 100, 100, 100, 0, 0, 10, 1)');
    });
    it('alpha/transparent/r/g/b/sが反映される', () => {
      const ret = movePicture.output(2, 80, 60, 128, true, 30, true, 50, 70, 90, 110);
      assert(ret[0] === 'PictureMove(2, 0, 80, 60, 0, 100, 128, 1, 50, 70, 90, 110, 0, 0, 30, 1)');
    });
  });
});
