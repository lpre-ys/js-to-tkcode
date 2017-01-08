'use strict';

const executeLog = require('./execute-log');

const KeyEntry = require('./commands/key-entry');
const MovePlace = require('./commands/move-place');

class TkMock {
  constructor(prjConst = {}) {
    this.state = 'test';
    this.commands = [];
    executeLog.reset();
    // const merge
    this.Const = require('./const');
    this.Const = Object.assign(this.Const, prjConst);
    // setFunctions
    this.setFunction(KeyEntry);
    this.setFunction(MovePlace);  // TODO test
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

  get name() {
    return 'tkMock';
  }
  get log() {
    return executeLog.log;
  }
}
module.exports = TkMock;
