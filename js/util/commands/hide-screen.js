import Command from '../command.js';
class HideScreen extends Command {

  run(type) {
    if (!type) {
      type = -1;
    }
    this.writeLog(`type: ${type}`);

    return true;
  }

  output(type) {
    if (!type) {
      type = -1;
    }
    return [`ScreenDel(${type})`];
  }

  get JP_NAME() {
    return '画面の消去';
  }
}

export default HideScreen;
