import Command from '../command.js';
class SetString extends Command {

  run(str, num) {
    this.writeLog(`${str}, ${num}`); // TODO

    return true;
  }

  output(str, num) {
    return [`Name("${str}", ${num})`];
  }

  get JP_NAME() {
    return '文章';
  }
}

export default SetString;
