import assert from 'power-assert';
import Choice from '../../../js/util/commands/choice.js';
import Command from '../../../js/util/command.js';
import executeLog from '../../../js/util/execute-log.js';
import tkVarManager from '../../../js/lib/tk-var-manager.js';

describe('Choice（選択肢の表示）', () => {
  const choice = new Choice();
  before(() => {
    tkVarManager.setOptions({ varList: { 'test': 42 }, tmpStart: 101, tmpEnd: 200 });
  });
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(choice instanceof Command);
    });
  });

  describe('JP_NAME', () => {
    it('JP_NAMEが選択肢の表示であること', () => {
      assert(choice.JP_NAME === '選択肢の表示');
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(choice.run(42, 'label', ['A', 'B']));
    });
  });

  describe('output', () => {
    describe('バリデーション', () => {
      it('choicesが配列でない場合、空配列を返す', () => {
        const ret = choice.output(42, 'label', 'not-array');
        assert(Array.isArray(ret) && ret.length === 0);
      });
      it('choicesが5個以上の場合、空配列を返す', () => {
        const ret = choice.output(42, 'label', ['A', 'B', 'C', 'D', 'E']);
        assert(Array.isArray(ret) && ret.length === 0);
      });
    });

    describe('2択・キャンセルあり (cancel=5)', () => {
      it('Choice命令が先頭に出力される', () => {
        const ret = choice.output(42, 'どうする？', ['はい', 'いいえ']);
        assert(ret[0] === 'Choice("どうする？", 5)');
      });
      it('選択肢のBranchとVariable(1-indexed)が出力される', () => {
        const ret = choice.output(42, 'どうする？', ['はい', 'いいえ']);
        assert(ret[1] === 'Branch("\\>はい", 0)');
        assert(ret[2] === 'Variable(0, 42, 42, 0, 0, 1, 0)');
        assert(ret[3] === 'Branch("\\>いいえ", 1)');
        assert(ret[4] === 'Variable(0, 42, 42, 0, 0, 2, 0)');
      });
      it('キャンセルBranchと-1代入が出力される', () => {
        const ret = choice.output(42, 'どうする？', ['はい', 'いいえ']);
        assert(ret[5] === 'Branch(4)');
        assert(ret[6] === 'Variable(0, 42, 42, 0, 0, -1, 0)');
      });
      it('EndChoiceが末尾に出力される', () => {
        const ret = choice.output(42, 'どうする？', ['はい', 'いいえ']);
        assert(ret[ret.length - 1] === 'EndChoice');
      });
    });

    describe('2択・キャンセルなし (cancel≠5)', () => {
      it('キャンセルBranchが含まれない', () => {
        const ret = choice.output(42, 'どうする？', ['A', 'B'], 0);
        assert(!ret.includes('Branch(4)'));
      });
    });

    describe('isFlash=false', () => {
      it('\\>プレフィックスが付かない', () => {
        const ret = choice.output(42, 'Q', ['A', 'B'], 5, false);
        assert(ret[1] === 'Branch("A", 0)');
      });
    });

    describe('isFlash=true (デフォルト)', () => {
      it('\\>プレフィックスが付く', () => {
        const ret = choice.output(42, 'Q', ['A', 'B']);
        assert(ret[1] === 'Branch("\\>A", 0)');
      });
    });

    describe('receive が変数名の場合', () => {
      it('変数番号に変換される', () => {
        const ret = choice.output('test', 'Q', ['A']);
        assert(ret.some(r => r.includes('Variable(0, 42,')));
      });
    });
  });
});
