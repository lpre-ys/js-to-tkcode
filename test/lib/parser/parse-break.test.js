import assert from 'power-assert';
import parseBreak from '../../../js/lib/parser/parse-break.js';

describe('Parser parseBreak', () => {
  it('parser.outputsに"Break"が追加される', () => {
    const parser = { outputs: [] };
    parseBreak({}, parser);
    assert(parser.outputs[0] === 'Break');
  });
  it('既存のoutputsに追記される', () => {
    const parser = { outputs: ['Loop'] };
    parseBreak({}, parser);
    assert(parser.outputs[0] === 'Loop');
    assert(parser.outputs[1] === 'Break');
  });
});
