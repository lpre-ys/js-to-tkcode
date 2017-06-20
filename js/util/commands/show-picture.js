'use strict';

const Command = require('../command');
const tkVarManager = require('../../lib/tk-var-manager');

class ShowPicture extends Command {

  run(file, num, x = 160, y = 120, alpha = 0, transparent = false, r = 100, g = 100, b = 100) {
    this.writeLog(`file: ${file}, num: ${num}, x: ${x}, y: ${y}, alpha: ${alpha}, transparent: ${transparent} r: ${r}, g: ${g}, b: ${b}`);

    return true;
  }

  output(file, num, x = 160, y = 120, alpha = 0, transparent = false, r = 100, g = 100, b = 100) {
    let isPointVar = false;
    if (typeof x == 'string') {
      x = tkVarManager.getVarNumber(x);
      y = tkVarManager.getVarNumber(y);
      isPointVar = true;
    }
    return [`Picture("${file}", ${num}, ${isPointVar ? 1 : 0}, ${x}, ${y}, 0, 100, ${alpha}, ${transparent ? 1 : 0}, ${r}, ${g}, ${b}, 100, 0, 0)`];
  }

  get JP_NAME() {
    return 'ピクチャーの表示';
  }
}

module.exports = ShowPicture;
