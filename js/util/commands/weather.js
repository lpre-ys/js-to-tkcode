import Command from '../command.js';
class Weather extends Command {

  run(type, value) {
    this.writeLog(`${type}, ${value}`);

    return true;
  }

  output(type, value) {
    return [`Weather(${type}, ${value})`];
  }

  get JP_NAME() {
    return '天候エフェクトの設定';
  }
}

export default Weather;
