import path from 'path';
import fs from 'fs';
import Command from '../command.js';

class Import extends Command {

  run(filepath) {
    this.writeLog(`filepath: ${filepath}`);

    return true;
  }

  output(filepath) {
    const subCode = fs.readFileSync(path.resolve(filepath)).toString();

    return subCode.split("\n");
  }

  get JP_NAME() {
    return 'ファイルインポート';
  }
}

export default Import;
