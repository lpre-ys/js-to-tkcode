const assert = require('power-assert');
const optimizeConst = require('../../../js/lib/optimizer/optimize-const');

const Const = require('../../../js/util/const');

const esprima = require('esprima');
const escodegen = require('escodegen');

const escodegenOption = {
  format: {
    newline: '',
    indent: {
      style: ''
    }
  }
};

describe('Optimizer optimizeConst', () => {
  it('Const定義あり', () => {
    const code = `tkMock.Const.KEY_DOWN`;
    const node = esprima.parse(code).body[0].expression;
    const ret = optimizeConst(node, Const);

    assert(escodegen.generate(ret, escodegenOption) == `1`);
  });
  it('Const定義なし', () => {
    const code = `test_var`;
    const node = esprima.parse(code).body[0].expression;
    const ret = optimizeConst(node, Const);

    assert(escodegen.generate(ret, escodegenOption) == `test_var`);
  });
});
