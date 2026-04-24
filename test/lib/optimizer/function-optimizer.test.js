'use strict';

const assert = require('power-assert');
const esprima = require('esprima');
const escodegen = require('escodegen');
const FunctionOptimizer = require('../../../js/lib/optimizer/function-optimizer');

describe('FunctionOptimizer', () => {
  let optimizer;
  beforeEach(() => {
    optimizer = new FunctionOptimizer();
  });

  describe('addFunction / getFunction', () => {
    it('登録した関数をgetFunctionで取得できる', () => {
      const node = esprima.parse('function foo() { return 1; }').body[0];
      optimizer.addFunction('foo', node);
      assert(optimizer.getFunction('foo') === node);
    });
    it('未登録の名前はfalseを返す', () => {
      assert(optimizer.getFunction('notExist') === false);
    });
  });

  describe('getNode', () => {
    it('未登録の名前はfalseを返す', () => {
      assert(optimizer.getNode('notExist', []) === false);
    });

    it('引数なしで関数本体のASTノードを返す', () => {
      const node = esprima.parse('function foo() { result = 42; }').body[0];
      optimizer.addFunction('foo', node);
      const result = optimizer.getNode('foo', []);
      assert(result !== false);
      assert(typeof result === 'object');
    });

    it('引数ありで仮引数が実引数に置換される', () => {
      const node = esprima.parse('function add(a, b) { result = a + b; }').body[0];
      optimizer.addFunction('add', node);
      const arg1 = esprima.parse('3').body[0].expression;
      const arg2 = esprima.parse('5').body[0].expression;
      const result = optimizer.getNode('add', [arg1, arg2]);
      const code = escodegen.generate(result);
      assert(code.includes('3') && code.includes('5'));
      assert(!code.includes(' a ') && !code.includes(' b '));
    });

    it('引数1つの置換が正しく動作する', () => {
      const node = esprima.parse('function double(x) { result = x + x; }').body[0];
      optimizer.addFunction('double', node);
      const arg = esprima.parse('7').body[0].expression;
      const result = optimizer.getNode('double', [arg]);
      const code = escodegen.generate(result);
      assert(!code.includes(' x'));
      assert(code.includes('7'));
    });
  });
});
