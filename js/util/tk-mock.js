'use strict';

const executeLog = require('./execute-log');

const KeyEntry = require('./commands/key-entry');
const AddMember = require('./commands/add-member');
const RemoveMember = require('./commands/remove-member');
const MovePlace = require('./commands/move-place');
const HidePc = require('./commands/hide-pc');
const ShowPc = require('./commands/show-pc');


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
    this.setFunction(AddMember);
    this.setFunction(RemoveMember);
    this.setFunction(HidePc);
    this.setFunction(ShowPc);
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
