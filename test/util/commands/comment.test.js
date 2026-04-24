'use strict';

const assert = require('power-assert');
const Comment = require('../../../js/util/commands/comment');
const Command = require('../../../js/util/command');
const executeLog = require('../../../js/util/execute-log');

describe('Comment（注釈）', () => {
  const comment = new Comment();
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(comment instanceof Command);
    });
  });

  describe('JP_NAME', () => {
    it('JP_NAMEが設定されていること', () => {
      assert(comment.JP_NAME === '注釈');
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(comment.run('メモ'));
    });
  });

  describe('output', () => {
    it('単一文字列の場合1命令を返す', () => {
      const ret = comment.output('これはコメント');
      assert(ret.length === 1);
      assert(ret[0] === 'Note("これはコメント")');
    });
    it('配列の場合複数命令を返す', () => {
      const ret = comment.output(['行1', '行2', '行3']);
      assert(ret.length === 3);
      assert(ret[0] === 'Note("行1")');
      assert(ret[1] === 'Note("行2")');
      assert(ret[2] === 'Note("行3")');
    });
  });
});
