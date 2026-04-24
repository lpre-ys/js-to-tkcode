'use strict';

const assert = require('power-assert');
const SetString = require('../../../js/util/commands/set-string');
const Command = require('../../../js/util/command');
const executeLog = require('../../../js/util/execute-log');

describe('SetString（文章設定）', () => {
  const setString = new SetString();
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(setString instanceof Command);
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(setString.run('hello', 0));
    });
  });

  describe('output', () => {
    it('Name("str", num)命令を返す', () => {
      const ret = setString.output('テスト', 3);
      assert(ret[0] === 'Name("テスト", 3)');
    });
  });
});
