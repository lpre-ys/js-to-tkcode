'use strict';

const Command = require('../command');
class PcShow extends Command {

  run() {
    this.writeLog(`表示`);

    return true;
  }

  output() {
    return [`Transparency(1)`];
  }

  get JP_NAME() {
    return '主人公の透明状態変更';
  }
}

module.exports = PcShow;
