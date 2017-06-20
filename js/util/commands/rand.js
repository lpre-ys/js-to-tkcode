'use strict';

const Command = require('../command');
class Rand extends Command {

  run(receive, min, max) {
    this.writeLog(`receive: ${receive}, min: ${min}, max: ${max}`);

    return true;
  }

  output(receive, min, max) {
    receive = this.parseVar(receive);
    return [`Variable(0, ${receive}, ${receive}, 0, 3, ${min}, ${max})`];
  }

  get JP_NAME() {
    return '変数の操作(乱数)';
  }
}

module.exports = Rand;
