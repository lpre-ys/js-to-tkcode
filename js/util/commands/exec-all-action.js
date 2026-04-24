import Command from '../command.js';
class ExecAllAction extends Command {

  run() {
    this.writeLog(``);

    return true;
  }

  output() {
    return [`ActionStart`];
  }

  get JP_NAME() {
    return '指定動作の全実行';
  }
}

export default ExecAllAction;
