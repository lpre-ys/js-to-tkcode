const assert = require('power-assert');
const optimize = require('../../../js/lib/optimizer/optimize');

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

describe('Optimizer optimize', () => {
  it('for文', () => {
    const code = `for (let i = 0; i < 3; i++) {test = 1}`;
    const ast = esprima.parse(code);
    const ret = optimize(ast);

    assert(escodegen.generate(ret, escodegenOption) == `{{test = 1;}{test = 1;}{test = 1;}}`);
  });
  describe('Function系', () => {
    it('引数無し', () => {
      const code = `sub();
function sub() {
  test = 123;
  test2 = 456;
}`;
    const ast = esprima.parse(code);
    const ret = optimize(ast);

    assert(escodegen.generate(ret, escodegenOption) == `{test = 123;test2 = 456;}`);
    });
    it('引数あり', () => {
      const code = `sub(42);
function sub(number) {
  test = number;
}`;
const ast = esprima.parse(code);
const ret = optimize(ast);

assert(escodegen.generate(ret, escodegenOption) == `{test = 42;}`);
    });
  });
});
