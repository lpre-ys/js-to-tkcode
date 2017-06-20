'use strict';

const Command = require('../command');
class CallMapEvent extends Command {

  run(id, page = 1) {
    this.writeLog(`${id}, ${page}`);

    return true;
  }

  output(id, page = 1) {
    return [`Call(1, ${id}, ${page})`];
  }

  get JP_NAME() {
    return 'イベントの呼び出し(MAP)';
  }
}

module.exports = CallMapEvent;
