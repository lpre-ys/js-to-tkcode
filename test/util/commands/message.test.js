import assert from 'power-assert';
import Message from '../../../js/util/commands/message.js';
import Command from '../../../js/util/command.js';
import executeLog from '../../../js/util/execute-log.js';

describe('Message（文章）', () => {
  const message = new Message();
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(message instanceof Command);
    });
  });

  describe('JP_NAME', () => {
    it('JP_NAMEが文章であること', () => {
      assert(message.JP_NAME === '文章');
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(message.run('hello'));
    });
  });

  describe('output', () => {
    it('単一文字列の場合1行のText命令を返す', () => {
      const ret = message.output('こんにちは');
      assert(ret.length === 1);
      assert(ret[0] === 'Text("こんにちは")');
    });
    it('配列の場合、先頭がText、残りがSubTになる', () => {
      const ret = message.output(['1行目', '2行目', '3行目']);
      assert(ret[0] === 'Text("1行目")');
      assert(ret[1] === 'SubT("2行目")');
      assert(ret[2] === 'SubT("3行目")');
    });
    it('isFlash=trueの場合、\\>プレフィックスが付く', () => {
      const ret = message.output('hello', true);
      assert(ret[0] === 'Text("\\>hello")');
    });
    it('isFlash=false（デフォルト）の場合、プレフィックスなし', () => {
      const ret = message.output('hello', false);
      assert(ret[0] === 'Text("hello")');
    });
    it('isFlash=trueかつ配列の場合、全行に\\>が付く', () => {
      const ret = message.output(['行1', '行2'], true);
      assert(ret[0] === 'Text("\\>行1")');
      assert(ret[1] === 'SubT("\\>行2")');
    });
  });
});
