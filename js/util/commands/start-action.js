'use strict';

const Command = require('../command');
class StartAction extends Command {

  run(eventId, repeat = false, speed = 8, ignore = 0) {
    this.writeLog(`eventId: ${eventId}`); // TODO

    return true;
  }

  output(eventId, repeat = false, speed = 8, ignore = 0) {
    return [`SetAction(${eventId}, ${speed}, ${repeat ? 1 : 0}, ${ignore})`];
  }

  get JP_NAME() {
    return 'キャラクターの動作指定';
  }
}

module.exports = StartAction;
