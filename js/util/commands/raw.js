import Command from '../command.js';
class Raw extends Command {

  run(cmd) {
    this.writeLog(`${cmd}`);

    return true;
  }

  output(cmd) {
    if (Array.isArray(cmd)) {
      return cmd;
    }
    return [cmd];
  }

  get JP_NAME() {
    return '生コマンド';
  }
}

export default Raw;
