const assert = require('power-assert');
const parseCall = require('../../../js/lib/parser/parse-call');
const TkMock = require('../../../js/util/tk-mock');
const Parser = require('../../../js/lib/parser/parser');

const esprima = require('esprima');

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
  });
});
