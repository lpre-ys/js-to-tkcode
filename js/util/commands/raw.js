'use strict';

const Command = require('../command');
class Raw extends Command {

  run(cmd) {
    this.writeLog(`${cmd}`);

    return true;
  }

  output(cmd) {
    if (Array.isArray(cmd)) {
      return cmd;
    }
    return [cmd];
  }

  get JP_NAME() {
    return '生コマンド';
  }
}

module.exports = Raw;
