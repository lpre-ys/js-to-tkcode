const TkMock = require('../util/tk-mock');

const tkMock = new TkMock();
tkMock.setOutputMode();
const ret = tkMock.keyEntry(42, false, ['enter']);

console.log(tkMock.log);
console.log(ret);
