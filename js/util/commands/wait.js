'use strict';

const Command = require('../command');
class Wait extends Command {

  run(tick) {
    this.writeLog(`wait: ${tick}`);

    return true;
  }

  output(tick) {
    return [`Wait(${tick})`];
  }

  get JP_NAME() {
    return 'ウェイト';
  }
}

module.exports = Wait;
