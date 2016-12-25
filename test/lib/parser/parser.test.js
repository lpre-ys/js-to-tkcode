const assert = require('power-assert');
// const TkMock = require('../../../js/util/tk-mock');
const Parser = require('../../../js/lib/parser/parser');

// const esprima = require('esprima');

describe('Parser parseCall', () => {
  let parser;
  beforeEach(() => {
    parser = new Parser();
  });
  describe('appendOutput', () => {
    it('配列ではない場合、pushする', () => {
      parser.outputs = [1, 2];
      parser.appendOutput('Test');
      assert(parser.outputs.length === 3);
      assert(parser.outputs[0] == 1);
      assert(parser.outputs[2] == 'Test');
    });
    it('配列の場合、mergeする', () => {
      parser.outputs = [1, 2];
      parser.appendOutput(['Test1', 'Test2']);
      assert(parser.outputs.length === 4);
      assert(parser.outputs[0] == 1);
      assert(parser.outputs[2] == 'Test1');
      assert(parser.outputs[3] == 'Test2');
    });
  });
});
