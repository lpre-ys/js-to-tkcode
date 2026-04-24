import Command from '../command.js';
import tkVarManager from '../../lib/tk-var-manager.js';

const keys = ['enter', 'cancel', 'shift', 'down', 'left', 'right', 'up'];
class KeyEntry extends Command {

  run(receive, push = true, targetKeys = false) {
    this.writeLog(`var[${receive}], push[${push}], target[${targetKeys ? targetKeys.join(',') : "ALL"}]`);

    return true;
  }
  output(receive, push = true, targetKeys = false) {
    const keyCodes = [];
    keys.forEach((key) => {
      keyCodes.push((!targetKeys || targetKeys.includes(key)) ? 1 : 0);
    });

    if (typeof receive == 'string') {
      const number = tkVarManager.getVarNumber(receive);
      receive = number;
    }
    return [`KeyEntry(${receive}, ${push ? 1 : 0}, 1, ${keyCodes.join(', ')})`];
  }
  get JP_NAME() {
    return 'キー入力の処理';
  }
}

export default KeyEntry;
