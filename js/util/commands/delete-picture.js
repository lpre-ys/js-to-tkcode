'use strict';

const Command = require('../command');
class DeletePicture extends Command {

  run(num) {
    this.writeLog(`num: ${num}`);

    return true;
  }

  output(num) {
    return [`PictureDel(${num})`];
  }

  get JP_NAME() {
    return 'ピクチャーの消去';
  }
}

module.exports = DeletePicture;
