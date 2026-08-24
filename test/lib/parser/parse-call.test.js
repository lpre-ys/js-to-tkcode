import assert from 'power-assert';
import parseCall from '../../../js/lib/parser/parse-call.js';
import TkMock from '../../../js/util/tk-mock.js';
import Parser from '../../../js/lib/parser/parser.js';
import esprima from 'esprima';


describe('Parser parseCall', () => {
  let parser;
  beforeEach(() => {
    // TODO TkMockのmock化
    //      以後のテストはすべてKeyEntryが存在する前提で書かれている。依存……。
    const tkMock = new TkMock({ MY_KEY: 42 });
    parser = new Parser(tkMock);
  });
  describe('TkMockのファンクション', () => {
    it('引数が1個', () => {
      const code = `tkMock.keyEntry(42)`;
      const node = esprima.parse(code).body[0].expression;
      parseCall(node, parser);

      assert(parser.outputs[0] === 'KeyEntry(42, 1, 1, 1, 1, 1, 1, 1, 1, 1)');
    });
    it('引数が複数', () => {
      const code = `tkMock.keyEntry(42, false, ['enter'])`;
      const node = esprima.parse(code).body[0].expression;
      parseCall(node, parser);

      assert(parser.outputs[0] === 'KeyEntry(42, 0, 1, 1, 0, 0, 0, 0, 0, 0)');
    });
    it('引数がテンプレートリテラル（式なし）', () => {
      const code = 'tkMock.message(`こんにちは`)';
      const node = esprima.parse(code).body[0].expression;
      parseCall(node, parser);

      assert(parser.outputs[0] === 'Text("こんにちは")');
    });
    it('引数がテンプレートリテラル（リテラル式あり）', () => {
      const code = 'tkMock.message(`level${10}up`)';
      const node = esprima.parse(code).body[0].expression;
      parseCall(node, parser);

      assert(parser.outputs[0] === 'Text("level10up")');
    });
    it('引数が二項式', () => {
      const code = `tkMock.keyEntry(40 + 2)`;
      const node = esprima.parse(code).body[0].expression;
      parseCall(node, parser);

      assert(parser.outputs[0] === 'KeyEntry(42, 1, 1, 1, 1, 1, 1, 1, 1, 1)');
    });
    it('テンプレートリテラルの式に二項式', () => {
      const code = 'tkMock.message(`HP: ${5 + 3}`)';
      const node = esprima.parse(code).body[0].expression;
      parseCall(node, parser);

      assert(parser.outputs[0] === 'Text("HP: 8")');
    });
    it('引数が定数参照（MemberExpression）', () => {
      const code = 'tkMock.keyEntry(tkMock.Const.MY_KEY)';
      const node = esprima.parse(code).body[0].expression;
      parseCall(node, parser);

      assert(parser.outputs[0] === 'KeyEntry(42, 1, 1, 1, 1, 1, 1, 1, 1, 1)');
    });
    it('配列の要素にテンプレートリテラルを含む', () => {
      const code = 'tkMock.message([\'1行目\', `2行目: ${10 + 5}`])';
      const node = esprima.parse(code).body[0].expression;
      parseCall(node, parser);

      assert(parser.outputs[0] === 'Text("1行目")');
      assert(parser.outputs[1] === 'SubT("2行目: 15")');
    });
    it('引数がUnaryExpression（負の数）', () => {
      const code = 'tkMock.keyEntry(-1)';
      const node = esprima.parse(code).body[0].expression;
      parseCall(node, parser);

      assert(parser.outputs[0] === 'KeyEntry(-1, 1, 1, 1, 1, 1, 1, 1, 1, 1)');
    });
    it('引数が未対応のtype（Identifier）はエラーを投げる', () => {
      const code = 'tkMock.keyEntry(someVar)';
      const node = esprima.parse(code).body[0].expression;

      assert.throws(() => { parseCall(node, parser); }, Error);
    });
    it('未定義の定数参照はエラーを投げる', () => {
      const code = 'tkMock.keyEntry(tkMock.Const.UNDEFINED_KEY)';
      const node = esprima.parse(code).body[0].expression;

      assert.throws(() => { parseCall(node, parser); }, Error);
    });
    it('引数がNewExpression経由のメソッド呼び出し（テンプレートリテラル内）', () => {
      const code = 'tkMock.message(`Date: ${(new Date(2026, 0, 1)).getFullYear()}`)';
      const node = esprima.parse(code).body[0].expression;
      parseCall(node, parser);

      assert(parser.outputs[0] === 'Text("Date: 2026")');
    });
    it('未対応のコンストラクタはエラーを投げる', () => {
      const code = 'tkMock.keyEntry((new NoSuchCtor()).valueOf())';
      const node = esprima.parse(code).body[0].expression;

      assert.throws(() => { parseCall(node, parser); }, Error);
    });
    it('単項演算子とCallExpressionを組み合わせても正しく評価される', () => {
      const code = 'tkMock.keyEntry(-((new Date(2026, 0, 1)).getFullYear()))';
      const node = esprima.parse(code).body[0].expression;
      parseCall(node, parser);

      assert(parser.outputs[0] === 'KeyEntry(-2026, 1, 1, 1, 1, 1, 1, 1, 1, 1)');
    });
    it('テンプレートリテラルの式に三項演算子（trueの場合）', () => {
      const code = 'tkMock.message(`#${true ? 5 : 1} Knight`)';
      const node = esprima.parse(code).body[0].expression;
      parseCall(node, parser);

      assert(parser.outputs[0] === 'Text("#5 Knight")');
    });
    it('テンプレートリテラルの式に三項演算子（falseの場合）', () => {
      const code = 'tkMock.message(`#${false ? 5 : 1} Knight`)';
      const node = esprima.parse(code).body[0].expression;
      parseCall(node, parser);

      assert(parser.outputs[0] === 'Text("#1 Knight")');
    });
    it('三項演算子はネストしても評価できる', () => {
      const code = 'tkMock.message(`${3 > 5 ? "S" : (3 > 2 ? "A" : "B")}`)';
      const node = esprima.parse(code).body[0].expression;
      parseCall(node, parser);

      assert(parser.outputs[0] === 'Text("A")');
    });
    it('テンプレートリテラルの式に論理演算子(||)', () => {
      const code = 'tkMock.message(`HP: ${0 || 99}`)';
      const node = esprima.parse(code).body[0].expression;
      parseCall(node, parser);

      assert(parser.outputs[0] === 'Text("HP: 99")');
    });
    it('テンプレートリテラルの式に論理演算子(&&)', () => {
      const code = 'tkMock.message(`HP: ${1 && 99}`)';
      const node = esprima.parse(code).body[0].expression;
      parseCall(node, parser);

      assert(parser.outputs[0] === 'Text("HP: 99")');
    });
  });
  describe('tkMock以外の関数呼び出し', () => {
    it('何も出力しない', () => {
      const code = 'someFunc(42)';
      const node = esprima.parse(code).body[0].expression;
      parseCall(node, parser);

      assert(parser.outputs.length === 0);
    });
  });
});
