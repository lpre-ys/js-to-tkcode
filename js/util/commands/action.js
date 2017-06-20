'use strict';

const Command = require('../command');
class Action extends Command {

  run(type, times = 1) {
    this.writeLog(`type: ${type}, times: ${times}`);

    return true;
  }

  output(type, times = 1) {
    return Array(times).fill(`SubAct(${type})`);
  }

  get JP_NAME() {
    return 'アクション';
  }
}

module.exports = Action;
