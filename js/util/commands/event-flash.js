'use strict';

const Command = require('../command');
class EventFlash extends Command {

  run(target, r = 31, g = 31, b = 31, volume = 31, time = 5, wait = true) {
    this.writeLog(`r: ${r}, g: ${g}, b: ${b}, volume: ${volume}, time: ${time}, wait: ${wait}`);

    return true;
  }

  output(target, r = 31, g = 31, b = 31, volume = 31, time = 5, wait = true) {
    return [`CharacterFlash(${target}, ${r}, ${g}, ${b}, ${volume}, ${time}, ${wait ? 1 : 0})`];
  }

  get JP_NAME() {
    return 'キャラクターのフラッシュ';
  }
}

module.exports = EventFlash;
