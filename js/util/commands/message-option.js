'use strict';

const Command = require('../command');
const Const = require('../const');
class MessageOption extends Command {

  run(isShowBg, position = -1) {
    this.writeLog(`${isShowBg}, ${position}`);

    return true;
  }

  output(isShowBg, position = -1) {
    if (position < 0) {
      position = Const.MSG_POSITION_BOTTOM;
    }
    return [`TextOption(${isShowBg ? 0 : 1}, ${position}, 0, 1)`];
  }

  get JP_NAME() {
    return '生コマンド';
  }
}

module.exports = MessageOption;
