import Command from '../command.js';
class Save extends Command {
  run() {
    this.writeLog(``);

    return true;
  }

  output() {
    return [`Save`];
  }

  get JP_NAME() {
    return '◆セーブ画面の呼び出し';
  }
}

export default Save;
