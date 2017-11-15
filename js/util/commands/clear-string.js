'use strict';

const Command = require('../command');
class ClearString extends Command {

  run(num, length = 1) {
    this.writeLog(`${num}, ${length}`); // TODO

    return true;
  }

  output(num, length = 1) {
    const ret = [];
    for (let i = 0; i < length; i++) {
      ret.push(`Name("", ${num + i})`);
    }
    return ret;
  }

  get JP_NAME() {
    return '文章(クリア)';
  }
}

module.exports = ClearString;
