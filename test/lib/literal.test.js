import assert from 'power-assert';
import esprima from 'esprima';
import literal from '../../js/lib/literal.js';

describe('literal', () => {
  describe('isLiteral', () => {
    it('Literalノードはtrueを返す', () => {
      const node = esprima.parse('42').body[0].expression;
      assert(literal.isLiteral(node) === true);
    });
    it('UnaryExpressionノードはtrueを返す', () => {
      const node = esprima.parse('-5').body[0].expression;
      assert(literal.isLiteral(node) === true);
    });
    it('Identifierノードはfalseを返す', () => {
      const node = esprima.parse('x').body[0].expression;
      assert(literal.isLiteral(node) === false);
    });
    it('nullはfalseを返す', () => {
      assert(literal.isLiteral(null) === false);
    });
    it('undefinedはfalseを返す', () => {
      assert(literal.isLiteral(undefined) === false);
    });
  });

  describe('isLiteralTest', () => {
    it('両辺がLiteralならtrueを返す', () => {
      const node = esprima.parse('3 > 5').body[0].expression;
      assert(literal.isLiteralTest(node) === true);
    });
    it('両辺がUnaryExpressionならtrueを返す', () => {
      const node = esprima.parse('-3 > -5').body[0].expression;
      assert(literal.isLiteralTest(node) === true);
    });
    it('左辺がIdentifierならfalseを返す', () => {
      const node = esprima.parse('x > 5').body[0].expression;
      assert(literal.isLiteralTest(node) === false);
    });
    it('右辺がIdentifierならfalseを返す', () => {
      const node = esprima.parse('3 > x').body[0].expression;
      assert(literal.isLiteralTest(node) === false);
    });
    it('rightがないノードはfalseを返す', () => {
      assert(literal.isLiteralTest({ left: { type: 'Literal' } }) === false);
    });
    it('leftがないノードはfalseを返す', () => {
      assert(literal.isLiteralTest({ right: { type: 'Literal' } }) === false);
    });
  });

  describe('getLiteralVar', () => {
    it('Literalノードは値を返す', () => {
      const node = esprima.parse('42').body[0].expression;
      assert(literal.getLiteralVar(node) === 42);
    });
    it('文字列Literalは文字列を返す', () => {
      const node = esprima.parse('"hello"').body[0].expression;
      assert(literal.getLiteralVar(node) === 'hello');
    });
    it('UnaryExpression(-5)は-5を返す', () => {
      const node = esprima.parse('-5').body[0].expression;
      assert(literal.getLiteralVar(node) === -5);
    });
    it('UnaryExpression(-0)は0を返す', () => {
      const node = esprima.parse('-0').body[0].expression;
      assert(literal.getLiteralVar(node) === 0);
    });
  });

  describe('parseLiteralBinary', () => {
    it('3 + 5 は 8 を返す', () => {
      const node = esprima.parse('3 + 5').body[0].expression;
      assert(literal.parseLiteralBinary(node) === 8);
    });
    it('3 > 5 は false を返す', () => {
      const node = esprima.parse('3 > 5').body[0].expression;
      assert(literal.parseLiteralBinary(node) === false);
    });
    it('5 > 3 は true を返す', () => {
      const node = esprima.parse('5 > 3').body[0].expression;
      assert(literal.parseLiteralBinary(node) === true);
    });
    it('10 - 4 は 6 を返す', () => {
      const node = esprima.parse('10 - 4').body[0].expression;
      assert(literal.parseLiteralBinary(node) === 6);
    });
  });
});
