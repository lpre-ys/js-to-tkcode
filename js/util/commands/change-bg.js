'use strict';

const Command = require('../command');
class ChangeBg extends Command {

  run(img) {
    this.writeLog(`${img}`);

    return true;
  }

  output(img) {
    return [`Panorama("${img}", 0, 0, 0, 0, 0, 0)`];
  }

  get JP_NAME() {
    return '遠景の変更';
  }
}

module.exports = ChangeBg;
