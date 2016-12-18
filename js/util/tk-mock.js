'use strict';

const KeyDown = require('./commands/key-down'); // TODO

class TkMock {
  constructor(options = {}) {
    this.state = 'test';
    this.varList = options.varList || {};
    this.switchList = options.switchList || {};
    this.tmpStart = options.tmpStart;
    this.tmpEnd = options.tmpEnd;

    // TODO
    const keyDown = new KeyDown();
    this.keyDown = keyDown.getMethod();
  }
  setOutputMode() {
    this.state = 'output';
  }
  get name() {
    return 'TkMock';
  }
  getVarNumber(name) {
    if (this.varList[name]) {
      return this.varList[name];
    }
    if(this.switchList[name]) {
      return this.switchList[name];
    }

    throw new Error(`未定義の変数です。: ${name}`);
  }

  getTmpVarNumber(index) {
    const number = this.tmpStart + index;
    if (number < this.tmpStart || number > this.tmpEnd) {
      throw new Error(`一時変数があふれました`);
    }

    return number;
  }

}
module.exports = TkMock;
