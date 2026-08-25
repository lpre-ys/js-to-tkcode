import parseTest from './parse-test.js';
import literal from '../literal.js';

function parseIf(node, parser) {
  let {test, consequent, alternate} = node;
  if (literal.isLiteral(test) && typeof literal.getLiteralVar(test) === 'boolean') {
    // booleanの場合、固定でなんやかんやするなんやかんや……？なんやかんやー
    // (!true のような、リテラルへの単項演算子も含む)
    if (literal.getLiteralVar(test)) {
      parser.parseAst(consequent);
    } else if (alternate) {
      parser.parseAst(alternate);
    }
  } else if (literal.isLiteralTest(test)) {
    // リテラル同士の比較も崩す
    const checkResult = literal.parseLiteralBinary(test);
    if (checkResult) {
      parser.parseAst(consequent);
    } else if (alternate) {
      parser.parseAst(alternate);
    }
  } else if (literal.isLiteral(test.right) && literal.isLiteralTest(test.left)) {
    // 左項が定数式、右が定数の場合
    const leftResult = literal.parseLiteralBinary(test.left);
    const checkResult = literal.applyBinaryOp(leftResult, test.operator, literal.getLiteralVar(test.right));
    if (checkResult) {
      parser.parseAst(consequent);
    } else if (alternate) {
      parser.parseAst(alternate);
    }
  } else {
    // 普通のIF
    parseTest(test, parser, !!alternate);
    consequent.type = 'Program';
    parser.parseAst(consequent);
    if (alternate) {
      parser.outputs.push(`Else`);
      parser.parseAst(alternate);
    }
    parser.outputs.push(`EndIf`);
  }
}

export default parseIf;
