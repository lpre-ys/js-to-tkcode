'use strict';

const Command = require('../command');
class ExitEvent extends Command {

  run() {
    this.writeLog(`exit event.`);

    return true;
  }

  output() {
    return [`Exit`];
  }

  get JP_NAME() {
    return 'イベント処理の中断';
  }
}

module.exports = ExitEvent;
