'use strict';

const KeyDown = require('./commands/key-down'); // TODO

class TkMock {
  constructor() {
    this.state = 'test';
  }
  setOutputMode() {
    this.state = 'output';
  }
  get name() {
    return 'TkMock';
  }
}
module.exports = TkMock;
