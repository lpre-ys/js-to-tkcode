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
    const tkMock = new TkMock();
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
  });
});
