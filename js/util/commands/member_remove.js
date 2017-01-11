'use strict';

const Command = require('../command');
class MemberRemove extends Command {

  run(member) {
    this.writeLog(`削除: ${member}`);

    return true;
  }

  output(member) {
    return [`Member(1, 0, ${member})`];
  }

  get JP_NAME() {
    return 'メンバーの入れ替え';
  }
}

module.exports = MemberRemove;
