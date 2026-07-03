import Command from '../command.js';
class Panorama extends Command {

  run(file, roopX = false, roopY = false, scrollX = false, speedX = 0, scrollY = false, speedY = 0) {
    this.writeLog(`file: ${file}, roopX: ${roopX}, roopY: ${roopY}, scrollX: ${scrollX}, speedX: ${speedX}, scrollY: ${scrollY}, speedY: ${speedY}`);

    return true;
  }

  output(file, roopX = false, roopY = false, scrollX = false, speedX = 0, scrollY = false, speedY = 0) {
    return [`Panorama("${file}", ${roopX ? 1 : 0}, ${roopY ? 1 : 0}, ${scrollX ? 1 : 0}, ${speedX}, ${scrollY ? 1 : 0}, ${speedY})`];
  }

  get JP_NAME() {
    return '◆遠景の変更';
  }
}

export default Panorama;
