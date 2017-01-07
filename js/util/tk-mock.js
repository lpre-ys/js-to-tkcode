'use strict';

const executeLog = require('./execute-log');

const KeyEntry = require('./commands/key-entry');

class TkMock {
  constructor(prjConst = {}) {
    this.state = 'test';
    this.commands = [];
    executeLog.reset();
    // const merge
    this.Const = require('./const');
    this.Const = Object.assign(this.Const, prjConst);
    // set Functions;
    const keyEntry = new KeyEntry();
    this.keyEntry = (...args) => {
      return keyEntry.execute.apply(keyEntry, args);
    };
    this.commands.push(keyEntry);
    // const dir = __dirname + '/commands';
    // const filelist = ['key-entry.js'];  // TODO
    // filelist.forEach((filename) => {
    //   const functionName = this.makeFunctionName(filename.slice(0, -3));
    //   const cmdClass = require(dir + '/' + filename);
    //   const instance = new cmdClass();
    //   this[functionName] = (...args) => {
    //     return instance.execute.apply(instance, args);
    //   };
    //   this.commands.push(instance);
    // });
  }
  setOutputMode() {
    this.state = 'output';
    this.commands.forEach((command) => {
      command.mode = 'output';
    });
  }
  get name() {
    return 'tkMock';
  }
  makeFunctionName(str) {
    const ret = str.replace(/-./g, (matched) => {
        return matched.charAt(1).toUpperCase();
    });

    return ret;
  }
  get log() {
    return executeLog.log;
  }
}
module.exports = TkMock;
