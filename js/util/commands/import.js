'use strict';

const path = require('path');
const fs = require('fs');

const Command = require('../command');
class Import extends Command {

  run(filepath) {
    this.writeLog(`filepath: ${filepath}`);

    return true;
  }

  output(filepath) {
    const subCode = fs.readFileSync(path.resolve(filepath)).toString();

    return subCode.split("\n");
  }

  get JP_NAME() {
    return 'ファイルインポート';
  }
}

module.exports = Import;
