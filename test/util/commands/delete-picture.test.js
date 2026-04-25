import assert from 'power-assert';
import DeletePicture from '../../../js/util/commands/delete-picture.js';
import Command from '../../../js/util/command.js';
import executeLog from '../../../js/util/execute-log.js';

describe('DeletePicture（ピクチャーの消去）', () => {
  const deletePicture = new DeletePicture();
  beforeEach(() => {
    executeLog.reset();
  });

  describe('constructor', () => {
    it('Commandクラスを継承していること', () => {
      assert(deletePicture instanceof Command);
    });
  });

  describe('JP_NAME', () => {
    it('JP_NAMEが設定されていること', () => {
      assert(deletePicture.JP_NAME === 'ピクチャーの消去');
    });
  });

  describe('run', () => {
    it('trueを返す', () => {
      assert(deletePicture.run(1));
    });
  });

  describe('output', () => {
    it('PictureDel(num)命令を返す', () => {
      const ret = deletePicture.output(3);
      assert(ret[0] === 'PictureDel(3)');
    });
  });
});
