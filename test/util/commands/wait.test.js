'use strict';

const assert = require('power-assert');
const Wait = require('../../../js/util/commands/wait');
const Command = require('../../../js/util/command');
const executeLog = require('../../../js/util/execute-log');

describe('Wait（ウェイト）', () => {
  const wait = new Wait();
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(wait instanceof Command);
    });
  });

  describe('JP_NAME', () => {
    it('JP_NAMEが設定されていること', () => {
      assert(wait.JP_NAME === 'ウェイト');
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(wait.run(30));
    });
  });

  describe('output', () => {
    it('Wait(tick)命令を返す', () => {
      const ret = wait.output(60);
      assert(ret[0] === 'Wait(60)');
    });
  });
});
