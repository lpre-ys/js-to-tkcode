import Command from '../command.js';
class DeletePicture extends Command {

  run(num) {
    this.writeLog(`num: ${num}`);

    return true;
  }

  output(num) {
    return [`PictureDel(${num})`];
  }

  get JP_NAME() {
    return 'ピクチャーの消去';
  }
}

export default DeletePicture;
