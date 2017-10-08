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
    let preFlash = isFlash ? '\\>' : '';
    let postFlash = isFlash ? '\\<' : '';
    const ret = [`Text("${preFlash}${text[0]}${postFlash}")`];
    for (let i = 1; i < text.length; i++) {
      ret.push(`SubT("${preFlash}${text[i]}${postFlash}")`);
    }
    return ret;
  }

  get JP_NAME() {
    return '文章';
  }
}

module.exports = Message;
