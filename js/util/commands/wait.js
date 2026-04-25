import Command from '../command.js';
class Wait extends Command {

  run(tick) {
    this.writeLog(`wait: ${tick}`);

    return true;
  }

  output(tick) {
    return [`Wait(${tick})`];
  }

  get JP_NAME() {
    return 'ウェイト';
  }
}

export default Wait;
