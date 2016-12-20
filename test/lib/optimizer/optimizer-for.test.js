const assert = require('power-assert');
const optimizeFor = require('../../../js/lib/optimizer/optimize-for');

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

describe('Optimizer optimizeFor', () => {
  it('index展開無し', () => {
    const code = `for (let i = 0; i < 3; i++) {test = 1}`;
    const node = esprima.parse(code).body[0];
    const ret = optimizeFor(node);

    assert(escodegen.generate(ret, escodegenOption) == `{{test = 1;}{test = 1;}{test = 1;}}`);
  });
  it('indexリテラル展開あり', () => {
    const code = `for (let i = 0; i < 3; i++) {test = i}`;
    const node = esprima.parse(code).body[0];
    const ret = optimizeFor(node);

    assert(escodegen.generate(ret, escodegenOption) == `{{test = 0;}{test = 1;}{test = 2;}}`);
  });
  it('body複数行', () => {
    const code = `for (let i = 0; i < 3; i++) {test = i; test2 = i * 2}`;
    const node = esprima.parse(code).body[0];
    const ret = optimizeFor(node);

    assert(escodegen.generate(ret, escodegenOption) == `{{test = 0;test2 = 0 * 2;}{test = 1;test2 = 1 * 2;}{test = 2;test2 = 2 * 2;}}`);
  });
});
