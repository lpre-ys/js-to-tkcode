'use strict';

const executeLog = require('./execute-log');
const commandList = require('./command-list');

class TkMock {
  constructor(prjConst = {}) {
    this.state = 'test';
    this.commands = [];
    executeLog.reset();
    // const merge
    this.Const = require('./const');
    this.Const = Object.assign(this.Const, prjConst);
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
module.exports = TkMock;
