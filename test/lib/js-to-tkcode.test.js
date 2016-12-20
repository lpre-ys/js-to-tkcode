const assert = require('power-assert');
const JsToTkcode = require('../../js/lib/js-to-tkcode');

describe('JsToTkcode', () => {
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
  describe('変数操作', () => {
    describe('シンプルな代入', () => {
      it('定数', () => {
        jsToTkcode.translate('test = 1;');
        assert(jsToTkcode.output == "Variable(0, 42, 42, 0, 0, 1, 0)");
      });
      it('変数', () => {
        jsToTkcode.translate('test = test2');
        assert(jsToTkcode.output == "Variable(0, 42, 42, 0, 1, 43, 0)");
      });
      it('一時変数', () => {
        jsToTkcode.translate('TMP[0] = 1;');
        assert(jsToTkcode.output == "Variable(0, 101, 101, 0, 0, 1, 0)");
      });
      describe('スイッチ(boolean)', () => {
        it('true', () => {
          jsToTkcode.translate('isTest1 = true');
          assert(jsToTkcode.output == `Switch(0, 21, 21, 0)`);
        });
        it('false', () => {
          jsToTkcode.translate('isTest1 = false');
          assert(jsToTkcode.output == `Switch(0, 21, 21, 1)`);
        });
      });
    });
    describe('複合代入演算子', () => {
      describe('リテラル', () => {
        it('足し算', () => {
          jsToTkcode.translate('test += 37;');
          assert(jsToTkcode.output == `Variable(0, 42, 42, 1, 0, 37, 0)`);
        });
        it('引き算', () => {
          jsToTkcode.translate('test -= 37;');
          assert(jsToTkcode.output == `Variable(0, 42, 42, 2, 0, 37, 0)`);
        });
        it('掛け算', () => {
          jsToTkcode.translate('test *= 37;');
          assert(jsToTkcode.output == `Variable(0, 42, 42, 3, 0, 37, 0)`);
        });
        it('割り算', () => {
          jsToTkcode.translate('test /= 37;');
          assert(jsToTkcode.output == `Variable(0, 42, 42, 4, 0, 37, 0)`);
        });
        it('余り', () => {
          jsToTkcode.translate('test %= 37;');
          assert(jsToTkcode.output == `Variable(0, 42, 42, 5, 0, 37, 0)`);
        });
      });
    });
    describe('リテラルとリテラルのシンプルな計算', () => {
      it('足し算', () => {
        jsToTkcode.translate('test = 1 + 2;');
        assert(jsToTkcode.output == "Variable(0, 42, 42, 0, 0, 3, 0)");
      });
      it('引き算', () => {
        jsToTkcode.translate('test = 1 - 2;');
        assert(jsToTkcode.output == "Variable(0, 42, 42, 0, 0, -1, 0)");
      });
      it('掛け算', () => {
        jsToTkcode.translate('test = 3 * 2;');
        assert(jsToTkcode.output == "Variable(0, 42, 42, 0, 0, 6, 0)");
      });
      it('割り算', () => {
        jsToTkcode.translate('test = 5 / 2;');
        assert(jsToTkcode.output == "Variable(0, 42, 42, 0, 0, 2, 0)");
      });
      it('余り', () => {
        jsToTkcode.translate('test = 5 % 2;');
        assert(jsToTkcode.output == "Variable(0, 42, 42, 0, 0, 1, 0)");
      });
    });
    describe('複雑なリテラルの計算', () => {
      it('1 + 2 * 3 = 7', () => {
        jsToTkcode.translate('test = 1 + 2 * 3');
        assert(jsToTkcode.output == "Variable(0, 42, 42, 0, 0, 7, 0)");
      });
      it('(1 + 2) * 3 = 9', () => {
        jsToTkcode.translate('test = (1 + 2) * 3');
        assert(jsToTkcode.output == "Variable(0, 42, 42, 0, 0, 9, 0)");
      });
    });
    describe('変数を含む計算', () => {
      it('左辺が変数、右辺がリテラル', () => {
        jsToTkcode.translate('test = test2 + 2;');
        assert(jsToTkcode.output == `Variable(0, 101, 101, 0, 1, 43, 0)
Variable(0, 101, 101, 1, 0, 2, 0)
Variable(0, 42, 42, 0, 1, 101, 0)`);
      });
      it('左辺が定数、右辺がリテラル', () => {
        jsToTkcode.translate('test = 2 + test2;');
        assert(jsToTkcode.output == `Variable(0, 101, 101, 0, 0, 2, 0)
Variable(0, 101, 101, 1, 1, 43, 0)
Variable(0, 42, 42, 0, 1, 101, 0)`);
      });
      it('変数と変数', () => {
        jsToTkcode.translate('test = test2 + test3;');
        assert(jsToTkcode.output == `Variable(0, 101, 101, 0, 1, 43, 0)
Variable(0, 101, 101, 1, 1, 44, 0)
Variable(0, 42, 42, 0, 1, 101, 0)`);
      });
      it('複雑な計算', () => {
        jsToTkcode.translate('test = test2 * 2 + 4 / test3;');
        assert(jsToTkcode.output == `Variable(0, 101, 101, 0, 1, 43, 0)
Variable(0, 101, 101, 3, 0, 2, 0)
Variable(0, 102, 102, 0, 0, 4, 0)
Variable(0, 102, 102, 4, 1, 44, 0)
Variable(0, 103, 103, 0, 1, 101, 0)
Variable(0, 103, 103, 1, 1, 102, 0)
Variable(0, 42, 42, 0, 1, 103, 0)`);
      });
    });
  });
  describe('for文', () => {
    it('リテラル展開', () => {
      jsToTkcode.translate(`for(let i = 0; i < 3; i++) {
        test = i;
      }`);
      assert(jsToTkcode.output == `Variable(0, 42, 42, 0, 0, 0, 0)
Variable(0, 42, 42, 0, 0, 1, 0)
Variable(0, 42, 42, 0, 0, 2, 0)`);
    });
  });
  describe('while文', () => {
    it('基本', () => {
      jsToTkcode.translate(`while(test == 321) {
        test2 = 654;
      }`);
      assert(jsToTkcode.output == `Loop
If(01, 42, 0, 321, 0, 0)
Break
EndIf
Variable(0, 43, 43, 0, 0, 654, 0)
EndLoop`);
    });
    it('無限ループ', () => {
      jsToTkcode.translate(`while(true) {
        test2 = 654;
      }`);
      assert(jsToTkcode.output == `Loop
Variable(0, 43, 43, 0, 0, 654, 0)
EndLoop`);
    });
  });
  describe('IF文', () => {
    describe('基本', () => {
      it('elseなし', () => {
        jsToTkcode.translate(`if (test == 123) {
          test2 = 456;
        }`);
        assert(jsToTkcode.output == `If(01, 42, 0, 123, 0, 0)
Variable(0, 43, 43, 0, 0, 456, 0)
EndIf`);
      });
      it('else有り', () => {
        jsToTkcode.translate(`if (test == 123) {
          test2 = 456;
        } else {
          test2 = 789;
        }`);
        assert(jsToTkcode.output == `If(01, 42, 0, 123, 0, 0)
Variable(0, 43, 43, 0, 0, 456, 0)
Else
Variable(0, 43, 43, 0, 0, 789, 0)
EndIf`);
      });
    });
  });

});
