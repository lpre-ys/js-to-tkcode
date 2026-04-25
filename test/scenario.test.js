import assert from 'power-assert';
import JsToTkcode from '../js/lib/js-to-tkcode.js';

describe('シナリオテスト', () => {
  const varList = {
    'myVar': 42,
    'myVar2': 43,
    'myVar3': 44
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
    myVar = 0;
    tkMock.keyEntry(42);
    if (myVar == tkMock.Const.KEY_DOWN) {
      keyDown()
    }

    function keyDown() {
      myVar2 = 123;
    }
`;
    it('変数リセット・キー入力・条件分岐・関数インライン化が正しく変換される', () => {
      const result = jsToTkcode.translate(code);
      // test = 0
      assert(result.includes('Variable(0, 42, 42, 0, 0, 0, 0)'));
      // tkMock.keyEntry(test) → KeyEntry命令
      assert(result.includes('KeyEntry(42,'));
      // if (test == KEY_DOWN(=1)) → If命令
      assert(result.includes('If(01, 42, 0, 1, 0, 0)'));
      // インライン化された関数本体: test2 = 123
      assert(result.includes('Variable(0, 43, 43, 0, 0, 123, 0)'));
      // EndIf
      assert(result.includes('EndIf'));
    });
  });

});
