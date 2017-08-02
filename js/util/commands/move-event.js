'use strict';

const Command = require('../command');
class MoveEvent extends Command {

  run(eventId, x, y) {
    this.writeLog(`eventId: ${eventId}, x: ${x}, y: ${y}`);

    return true;
  }

  output(eventId, x, y) {
    let type = 0;
    if (typeof x == 'string') {
      x = this.parseVar(x);
      y = this.parseVar(y);
      type = 1;
    }
    return [`SetEvent(${eventId}, ${type}, ${x}, ${y})`];
  }

  get JP_NAME() {
    return 'イベントの位置を設定';
  }
}

module.exports = MoveEvent;
