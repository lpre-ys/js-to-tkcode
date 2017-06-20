'use strict';

const Command = require('../command');
class ExecAllAction extends Command {

  run() {
    this.writeLog(``);

    return true;
  }

  output() {
    return [`ActionStart`];
  }

  get JP_NAME() {
    return '指定動作の全実行';
  }
}

module.exports = ExecAllAction;
