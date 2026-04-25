import Command from '../command.js';
class CallEvent extends Command {

  run(id) {
    this.writeLog(`${id}`);

    return true;
  }

  output(id) {
    return [`Call(0, ${id}, 0)`];
  }

  get JP_NAME() {
    return 'イベントの呼び出し(コモン)';
  }
}

export default CallEvent;
