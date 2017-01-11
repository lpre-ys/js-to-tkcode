'use strict';

const Command = require('../command');
class AddMember extends Command {

  run(member) {
    this.writeLog(`追加: ${member}`);

    return true;
  }

  output(member) {
    return [`Member(0, 0, ${member})`];
  }

  get JP_NAME() {
    return 'メンバーの入れ替え';
  }
}

module.exports = AddMember;
