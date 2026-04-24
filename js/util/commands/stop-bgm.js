import Command from '../command.js';
  class StopBgm extends Command {

  run() {
    this.writeLog(``);

    return true;
  }

  output() {
    return [`PlayBGM("(OFF)", 0, 100, 100, 50)`];
  }

  get JP_NAME() {
    return '効果音の演奏(停止)';
  }
}

export default StopBgm;
