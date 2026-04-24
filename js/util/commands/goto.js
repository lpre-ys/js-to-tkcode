import Command from '../command.js';
class Goto extends Command {

  run(label) {
    this.writeLog(`label: ${label}`);

    return true;
  }

  output(label) {
    return [`LabelJump(${label})`];
  }

  get JP_NAME() {
    return '指定ラベルへ飛ぶ';
  }
}

export default Goto;
