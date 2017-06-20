'use strict';

const Command = require('../command');
class ChangeTone extends Command {

  run(r = 100, g = 100, b = 100, s = 100, time = 10, wait = true) {
    this.writeLog(``);   // TODO

    return true;
  }

  output(r = 100, g = 100, b = 100, s = 100, time = 10, wait = true) {
    return [`ScreenTone(${r}, ${g}, ${b}, ${s}, ${time}, ${wait ? 1 : 0})`];
  }

  get JP_NAME() {
    return '画面の色調変更';
  }
}

module.exports = ChangeTone;
