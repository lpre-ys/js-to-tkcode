'use strict';

const Command = require('../command');
class CancelAllAction extends Command {

  run() {
    this.writeLog(``);

    return true;
  }

  output() {
    return [`ActionCancel`];
  }

  get JP_NAME() {
    return '指定動作の全解除';
  }
}

module.exports = CancelAllAction;
