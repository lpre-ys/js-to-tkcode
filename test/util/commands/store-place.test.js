import assert from 'power-assert';
import StorePlace from '../../../js/util/commands/store-place.js';
import Command from '../../../js/util/command.js';
import executeLog from '../../../js/util/execute-log.js';
import tkVarManager from '../../../js/lib/tk-var-manager.js';

describe('StorePlace（現在の場所を記憶）', () => {
  const storePlace = new StorePlace();
  before(() => {
    tkVarManager.setOptions({ varList: { 'mapId': 10, 'posX': 20, 'posY': 30 }, tmpStart: 101, tmpEnd: 200 });
  });
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(storePlace instanceof Command);
    });
  });

  describe('JP_NAME', () => {
    it('JP_NAMEが設定されていること', () => {
      assert(storePlace.JP_NAME === '現在の場所を記憶');
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(storePlace.run('mapId', 'posX', 'posY'));
    });
  });

  describe('output', () => {
    it('変数名を変数番号に変換してStorePlace命令を返す', () => {
      const ret = storePlace.output('mapId', 'posX', 'posY');
      assert(ret[0] === 'StorePlace(10, 20, 30)');
    });
    it('数値をそのまま使ってStorePlace命令を返す', () => {
      const ret = storePlace.output(5, 15, 25);
      assert(ret[0] === 'StorePlace(5, 15, 25)');
    });
  });
});
