import executeLog from './execute-log.js';
import commandList from './command-list.js';
import _Const from './const.js';

class TkMock {
  constructor(pjConst = {}) {
    this.state = 'test';
    this.commands = [];
    executeLog.reset();
    // const merge
    this.Const = Object.assign({..._Const}, pjConst.hasOwnProperty('pjConst') ? pjConst.pjConst : pjConst);

    // setFunctions
    Object.keys(commandList).forEach((key) => {
      this.setFunction(commandList[key]);
    });
  }
  setOutputMode() {
    this.state = 'output';
    this.commands.forEach((command) => {
      command.mode = 'output';
    });
  }

  setFunction(Klass) {
    // TODO test
    const obj = new Klass();
    const functionName = Klass.name.charAt(0).toLowerCase() + Klass.name.substr(1);
    this[functionName] = (...args) => {
      return obj.execute.apply(obj, args);
    };
    this.commands.push(obj);
  }

  addConfig(constObj) {
    this.Const = Object.assign(this.Const, constObj);
  }

  get name() {
    return 'tkMock';
  }
  get log() {
    return executeLog.log;
  }
}
export default TkMock;
