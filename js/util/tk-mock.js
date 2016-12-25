'use strict';

const fs = require('fs');

const executeLog = require('./execute-log');

class TkMock {
  constructor() {
    this.state = 'test';
    this.commands = [];
    executeLog.reset();
    this.Const = require('./const');
    // set Functions;
    const dir = __dirname + '/commands';
    const filelist = fs.readdirSync(dir);
    filelist.forEach((filename) => {
      const functionName = this.makeFunctionName(filename.slice(0, -3));
      const cmdClass = require(dir + '/' + filename);
      const instance = new cmdClass();
      this[functionName] = (...args) => {
        return instance.execute.apply(instance, args);
      };
      this.commands.push(instance);
    });
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
