'use strict';

const Command = require('../command');
class Message extends Command {

  run(text, isFlash = false) {
    this.writeLog(`${text}, ${isFlash ? "flash" : ''}`); // TODO

    return true;
  }

  output(text, isFlash = false) {
    if (!Array.isArray(text)) {
      text = [text];
    }
    const preFlash = isFlash ? '\\>' : '';
    const ret = [`Text("${preFlash}${text[0]}")`];
    for (let i = 1; i < text.length; i++) {
      ret.push(`SubT("${preFlash}${text[i]}")`);
    }
    return ret;
  }

  get JP_NAME() {
    return '文章';
  }
}

module.exports = Message;
