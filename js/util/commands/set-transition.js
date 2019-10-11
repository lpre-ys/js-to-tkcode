'use strict';

const Command = require('../command');
class SetTransition extends Command {

  run(type, effect) {
    if (!type) {
      type = -1;
    }
    this.writeLog(`type: ${type}, effect: ${effect}`);

    return true;
  }

  output(type, effect) {
    if (!effect) {
      effect = 0; // フェードアウト
    }
    return [`Screen(${type}, ${effect})`];
  }

  get JP_NAME() {
    return '画面切り替え方式の変更';
  }
}

module.exports = SetTransition;
