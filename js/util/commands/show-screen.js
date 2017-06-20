'use strict';

const Command = require('../command');
class ShowScreen extends Command {

  run(type) {
    if (!type) {
      type = -1;
    }
    this.writeLog(`type: ${type}`);

    return true;
  }

  output(type) {
    if (!type) {
      type = -1;
    }
    return [`ScreenDisplay(${type})`];
  }

  get JP_NAME() {
    return '画面の表示';
  }
}

module.exports = ShowScreen;
