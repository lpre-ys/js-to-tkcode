class ExecuteLog {
  constructor() {
    this.logs = [];
  }

  push(log) {
    this.logs.push(log);
  }

  get last() {
    if (this.logs.length == 0) {
      return '';
    }
    return this.logs[this.logs.length - 1];
  }
}

const executeLog = new ExecuteLog();

module.exports = executeLog;
