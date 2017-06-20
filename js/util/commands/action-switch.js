'use strict';

const Command = require('../command');
class ActionSwitch extends Command {

  run(target, value) {
    this.writeLog(`target: ${target}, value: ${value}`);

    return true;
  }

  output(target, value) {
    const actionId = value ? 32: 33;
    target = this.parseVar(target);
    return [`SubAct(${actionId}, ${target})`];
  }

  get JP_NAME() {
    return 'アクション(スイッチ)';
  }
}

module.exports = ActionSwitch;
