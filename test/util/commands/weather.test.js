import assert from 'power-assert';
import Weather from '../../../js/util/commands/weather.js';
import Command from '../../../js/util/command.js';
import executeLog from '../../../js/util/execute-log.js';

describe('Weather（天候エフェクトの設定）', () => {
  const weather = new Weather();
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(weather instanceof Command);
    });
  });

  describe('JP_NAME', () => {
    it('JP_NAMEが設定されていること', () => {
      assert(weather.JP_NAME === '天候エフェクトの設定');
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(weather.run(1, 5));
    });
  });

  describe('output', () => {
    it('Weather(type, value)命令を返す', () => {
      const ret = weather.output(1, 5);
      assert(ret[0] === 'Weather(1, 5)');
    });
  });
});
