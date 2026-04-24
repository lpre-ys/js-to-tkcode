import Command from '../command.js';
class ExitEvent extends Command {

  run() {
    this.writeLog(`exit event.`);

    return true;
  }

  output() {
    return [`Exit`];
  }

  get JP_NAME() {
    return 'イベント処理の中断';
  }
}

export default ExitEvent;
