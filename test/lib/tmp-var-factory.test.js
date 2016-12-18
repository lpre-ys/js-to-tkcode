const assert = require('power-assert');
const tmpVarFactory = require('../../js/lib/tmp-var-factory');

describe('tmpVarFactory', () => {
  beforeEach(() => {
    tmpVarFactory.reset();
  });
  describe('変数名払い出し', () => {
    it('初回時、TMP[0]であること', () => {
      assert(tmpVarFactory.make() === 'TMP[0]');
    });
    it('2回目の呼び出し時、TMP[1]であること', () => {
      tmpVarFactory.make();
      assert(tmpVarFactory.make() === 'TMP[1]');
    });
  });
  it('リセット後、TMP[0]に戻ること', () => {
    tmpVarFactory.make();
    tmpVarFactory.reset();
    assert(tmpVarFactory.make() === 'TMP[0]');
  });
});
