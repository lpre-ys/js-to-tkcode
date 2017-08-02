'use strict';

const Command = require('../command');
class Goto extends Command {

  run(label) {
    this.writeLog(`label: ${label}`);

    return true;
  }

  output(label) {
    return [`LabelJump(${label})`];
  }

  get JP_NAME() {
    return '指定ラベルへ飛ぶ';
  }
}

module.exports = Goto;
