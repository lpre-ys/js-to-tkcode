import assert from 'power-assert';
import GetCharaInfo from '../../../js/util/commands/get-chara-info.js';
import Command from '../../../js/util/command.js';
import executeLog from '../../../js/util/execute-log.js';
import tkVarManager from '../../../js/lib/tk-var-manager.js';

describe('GetCharaInfo（キャラ情報取得）', () => {
  const getCharaInfo = new GetCharaInfo();
  before(() => {
    tkVarManager.setOptions({ varList: { 'test': 42 }, tmpStart: 101, tmpEnd: 200 });
  });
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(getCharaInfo instanceof Command);
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(getCharaInfo.run(42, 10001, 0));
    });
  });

  describe('output', () => {
    it('receiveが数値の場合そのまま使われる', () => {
      const ret = getCharaInfo.output(42, 10001, 0);
      assert(ret[0] === 'Variable(0, 42, 42, 0, 6, 10001, 0)');
    });
    it('receiveが文字列（変数名）の場合、変数番号に変換される', () => {
      const ret = getCharaInfo.output('test', 10001, 2);
      assert(ret[0] === 'Variable(0, 42, 42, 0, 6, 10001, 2)');
    });
    it('ev/typeが反映される', () => {
      const ret = getCharaInfo.output(10, 10005, 3);
      assert(ret[0] === 'Variable(0, 10, 10, 0, 6, 10005, 3)');
    });
  });
});
