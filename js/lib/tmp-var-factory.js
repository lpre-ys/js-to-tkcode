"use strict";

const TMP_ARR_NAME = 'TMP';

class TmpVarFactory {
  constructor() {
    this.tmpIndex = 0;
  }
  make() {
    const name = `${TMP_ARR_NAME}[${this.tmpIndex}]`;
    this.tmpIndex++;

    return name;
  }
  reset() {
    this.tmpIndex = 0;
  }

  get TMP_ARR_NAME() {
    return TMP_ARR_NAME;
  }
}

module.exports = new TmpVarFactory();
