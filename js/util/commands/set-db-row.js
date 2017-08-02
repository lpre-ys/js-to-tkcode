'use strict';

const Command = require('../command');
class SetDbRow extends Command {

  run(label, id = false) {
    this.writeLog(`${label}, ${id}`); // TODO

    return true;
  }

  output(label, id = false) {
    return `@db: ${label}${id ? ', ' + id.toString() : ''}`;
  }

  get JP_NAME() {
    return 'DB行設定';
  }
}

module.exports = SetDbRow;
