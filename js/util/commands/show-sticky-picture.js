'use strict';

const Command = require('../command');

class ShowStickyPicture extends Command {

  run(file, num, x = 160, y = 120, alpha = 0, transparent = false, r = 100, g = 100, b = 100) {
    this.writeLog(`file: ${file}, num: ${num}, x: ${x}, y: ${y}, alpha: ${alpha}, transparent: ${transparent} r: ${r}, g: ${g}, b: ${b}`);

    return true;
  }

  output(file, num, x = 160, y = 120, alpha = 0, transparent = false, r = 100, g = 100, b = 100) {
    let isPointVar = false;
    if (typeof x == 'string') {
      x = this.parseVar(x);
      y = this.parseVar(y);
      isPointVar = true;
    }
    return [`Picture("${file}", ${num}, ${isPointVar ? 1 : 0}, ${x}, ${y}, 1, 100, ${alpha}, ${transparent ? 1 : 0}, ${r}, ${g}, ${b}, 100, 0, 0)`];
  }

  get JP_NAME() {
    return 'ピクチャーの表示';
  }
}

module.exports = ShowStickyPicture;
