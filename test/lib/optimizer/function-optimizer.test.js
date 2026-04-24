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

    it('複数文の関数本体が全て返される', () => {
      const node = esprima.parse('function multi() { a = 1; b = 2; c = 3; }').body[0];
      optimizer.addFunction('multi', node);
      const result = optimizer.getNode('multi', []);
      const code = escodegen.generate(result);
      assert(code.includes('a = 1'));
      assert(code.includes('b = 2'));
      assert(code.includes('c = 3'));
    });

    it('複数文＋引数置換で全文に置換が適用される', () => {
      const node = esprima.parse('function setTwo(x) { a = x; b = x + 1; }').body[0];
      optimizer.addFunction('setTwo', node);
      const arg = esprima.parse('10').body[0].expression;
      const result = optimizer.getNode('setTwo', [arg]);
      const code = escodegen.generate(result);
      assert(code.includes('a = 10'));
      assert(code.includes('b = 10'));
      assert(!code.includes(' x'));
    });
  });
});
