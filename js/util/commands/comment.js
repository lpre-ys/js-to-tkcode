'use strict';

const Command = require('../command');
class Comment extends Command {

  run(comments) {
    this.writeLog(`${comments}`); // TODO

    return true;
  }

  output(comments) {
    if (!Array.isArray(comments)) {
      comments = [comments];
    }
    const ret = comments.map((comment) => {return `Note("${comment}")`;});
    return ret;
  }

  get JP_NAME() {
    return '注釈';
  }
}

module.exports = Comment;
