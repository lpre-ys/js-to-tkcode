import assert from 'power-assert';
import executeLog from '../../js/util/execute-log.js';

describe('ExecuteLog', () => {
  beforeEach(() => {
    executeLog.reset();
  });

  describe('push / last', () => {
    it('pushしたログをlastで取得できる', () => {
      executeLog.push('test message');
      assert(executeLog.last === 'test message');
    });
    it('複数pushした場合、lastは最後のログを返す', () => {
      executeLog.push('first');
      executeLog.push('second');
      assert(executeLog.last === 'second');
    });
  });

  describe('reset', () => {
    it('resetするとlastが空文字を返す', () => {
      executeLog.push('something');
      executeLog.reset();
      assert(executeLog.last === '');
    });
  });

  describe('last (空の場合)', () => {
    it('ログが0件のとき空文字を返す', () => {
      assert(executeLog.last === '');
    });
  });

  describe('log', () => {
    it('複数ログを改行で連結した文字列を返す', () => {
      executeLog.push('line1');
      executeLog.push('line2');
      assert(executeLog.log === 'line1\nline2');
    });
    it('1件のときそのまま返す', () => {
      executeLog.push('only');
      assert(executeLog.log === 'only');
    });
    it('0件のとき空文字を返す', () => {
      assert(executeLog.log === '');
    });
  });
});
