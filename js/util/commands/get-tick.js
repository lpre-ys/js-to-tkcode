import Command from '../command.js';
import tkVarManager from '../../lib/tk-var-manager.js';

class GetTick extends Command {

  run(receive) {
    this.writeLog(`${receive}`);

    return true;
  }

  output(receive) {
    if (typeof receive == 'string') {
      const number = tkVarManager.getVarNumber(receive);
      receive = number;
    }
    return [`Variable(0, ${receive}, ${receive}, 0, 7, 8, 0)`];
  }

  get JP_NAME() {
    return '◆変数の操作：代入, MIDIの演奏位置(Tick)';
  }
}

export default GetTick;
