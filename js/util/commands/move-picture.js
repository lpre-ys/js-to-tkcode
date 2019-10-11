'use strict';

const Command = require('../command');

class MovePicture extends Command {

  run(num, x = 160, y = 120, alpha = 0, transparent = false, time = 0, wait = false, r = 100, g = 100, b = 100, s = 100) {
    this.writeLog(`, num: ${num}, x: ${x}, y: ${y}, alpha: ${alpha}, transparent: ${transparent}, time: ${time}, wait: ${wait}`);

    return true;
  }

  output(num, x = 160, y = 120, alpha = 0, transparent = false, time = 0, wait = false, r = 100, g = 100, b = 100, s = 100) {
    let isPointVar = false;
    if (typeof x == 'string') {
      x = this.parseVar(x);
      y = this.parseVar(y);
      isPointVar = true;
    }
    return [`PictureMove(${num}, ${isPointVar ? 1 : 0}, ${x}, ${y}, 0, 100, ${alpha}, ${transparent ? 1 : 0}, ${r}, ${g}, ${b}, ${s}, 0, 0, ${time}, ${wait ? 1 : 0})`];
  }

  get JP_NAME() {
    return 'ピクチャーの移動';
  }
}

module.exports = MovePicture;
