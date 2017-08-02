'use strict';

const Command = require('../command');
class Label extends Command {

  run(label) {
    this.writeLog(`label: ${label}`);

    return true;
  }

  output(label) {
    return [`Label(${label})`];
  }

  get JP_NAME() {
    return 'ラベルの設定';
  }
}

module.exports = Label;
