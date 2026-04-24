import Command from '../command.js';
class ResetFace extends Command {

  run() {
    this.writeLog(``);

    return true;
  }

  output() {
    return [`Faice(0, 0, 0)`];
  }

  get JP_NAME() {
    return '顔グラフィックの変更(無し)';
  }
}

export default ResetFace;
