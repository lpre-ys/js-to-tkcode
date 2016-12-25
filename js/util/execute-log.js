class ExecuteLog {
  constructor() {
    this.logs = [];
  }

  push(log) {
    this.logs.push(log);
  }

  reset() {
    this.logs.length = 0;
  }

  get last() {
    if (this.logs.length == 0) {
      return '';
    }
    return this.logs[this.logs.length - 1];
  }

  get log() {
    return this.logs.join("\n");
  }
}

const executeLog = new ExecuteLog();

module.exports = executeLog;
