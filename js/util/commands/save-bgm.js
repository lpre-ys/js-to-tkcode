import Command from '../command.js';
class SaveBgm extends Command {

  run() {
    this.writeLog(``);

    return true;
  }

  output() {
    return [`StoreBGM`];
  }

  get JP_NAME() {
    return '現在のBGMを記憶';
  }
}

export default SaveBgm;
