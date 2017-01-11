'use strict';

const Command = require('../command');
class HidePc extends Command {

  run() {
    this.writeLog(`非表示`);

    return true;
  }

  output() {
    return [`Transparency(0)`];
  }

  get JP_NAME() {
    return '主人公の透明状態変更';
  }
}

module.exports = HidePc;
