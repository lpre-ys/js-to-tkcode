const assert = require('power-assert');
const JsToTkcode = require('../js/lib/js-to-tkcode');

describe('シナリオテスト', () => {
  const varList = {
    'test': 42,
    'test2': 43,
    'test3': 44
  };
  const tmpStart = 101;
  const tmpEnd = 200;
  const switchList = {
    'isTest1': 21
  };
  let jsToTkcode;
  beforeEach(() => {
    jsToTkcode = new JsToTkcode({varList, tmpStart, tmpEnd, switchList});
  });
  describe('シナリオ１', () => {
    const code = `
    test = 0;
    tkMock.keyEntry(test);
    if (test == tkMock.Const.KEY_DOWN) {
      keyDown()
    }

    function keyDown() {
      test2 = 123;
    }
`;
  });

});
