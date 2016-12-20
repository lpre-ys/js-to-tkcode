'use strict';

class TkVarManager {
  setOptions(options = {}) {
    this.varList = options.varList || {};
    this.switchList = options.switchList || {};
    this.tmpStart = options.tmpStart;
    this.tmpEnd = options.tmpEnd;
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
const instance = new TkVarManager();
module.exports = instance;
