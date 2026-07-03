import Command from '../command.js';
class AllowMenu extends Command {

  run(allow = true) {
    this.writeLog(`${allow}`);

    return true;
  }

  output(allow = true) {
    return [`MenuProhibition(${allow ? 1 : 0})`];
  }

  get JP_NAME() {
    return '◆メニュー画面禁止の変更';
  }
}

export default AllowMenu;
