'use strict';

const Command = require('../command');
class MoveEvent extends Command {

  run(eventId, x, y, type = 0) {
    this.writeLog(`eventId: ${eventId}, x: ${x}, y: ${y}, type: ${type}`);

    return true;
  }

  output(eventId, x, y, type = 0) {
    return [`SetEvent(${eventId}, ${type}, ${x}, ${y})`];
  }

  get JP_NAME() {
    return 'イベントの位置を設定';
  }
}

module.exports = MoveEvent;
