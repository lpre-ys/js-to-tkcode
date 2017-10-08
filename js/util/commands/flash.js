'use strict';

const Command = require('../command');
class Flash extends Command {

  run(r, g, b, volume = 31, time = 5, wait = true) {
    this.writeLog(`r: ${r}, g: ${g}, b: ${b}, volume: ${volume}, time: ${time}, wait: ${wait}`);

    return true;
  }

  output(r, g, b, volume = 31, time = 5, wait = true) {
    return [`ScreenFlash(${r}, ${g}, ${b}, ${volume}, ${time}, ${wait ? 1 : 0})`];
  }

  get JP_NAME() {
    return '画面のフラッシュ';
  }
}

module.exports = Flash;
