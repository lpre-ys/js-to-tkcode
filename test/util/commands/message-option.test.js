import assert from 'power-assert';
import MessageOption from '../../../js/util/commands/message-option.js';
import Command from '../../../js/util/command.js';
import executeLog from '../../../js/util/execute-log.js';

describe('MessageOption（メッセージオプション）', () => {
  const messageOption = new MessageOption();
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(messageOption instanceof Command);
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(messageOption.run(true));
    });
  });

  describe('output', () => {
    it('isShowBg=trueの場合、第1引数が0になる', () => {
      const ret = messageOption.output(true, 2);
      assert(ret[0] === 'TextOption(0, 2, 0, 1)');
    });
    it('isShowBg=falseの場合、第1引数が1になる', () => {
      const ret = messageOption.output(false, 2);
      assert(ret[0] === 'TextOption(1, 2, 0, 1)');
    });
    it('position<0の場合、MSG_POSITION_BOTTOM(=2)になる', () => {
      const ret = messageOption.output(true, -1);
      assert(ret[0] === 'TextOption(0, 2, 0, 1)');
    });
    it('positionが未指定(-1デフォルト)の場合もMSG_POSITION_BOTTOM(=2)になる', () => {
      const ret = messageOption.output(true);
      assert(ret[0] === 'TextOption(0, 2, 0, 1)');
    });
  });
});
