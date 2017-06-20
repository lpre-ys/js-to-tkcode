'use strict';

const Command = require('../command');
class Message extends Command {

  run(text) {
    this.writeLog(`${text}`); // TODO

    return true;
  }

  output(text) {
    if (!Array.isArray(text)) {
      text = [text];
    }
    const ret = [`Text("${text[0]}")`];
    for (let i = 1; i < text.length; i++) {
      ret.push(`SubT("${text[i]}")`);
    }
    return ret;
  }

  get JP_NAME() {
    return '文章';
  }
}

module.exports = Message;
