'use strict';

const Command = require('../command');
class MovePlace extends Command {

  run(map, x = 0, y = 0) {
    this.writeLog(`map[${map}], x[${x}], y[${y}]`);

    return true;
  }

  output(map, x = 0, y = 0) {
    if (typeof map == 'string') {
      map = this.parseVar(map);
      x = this.parseVar(x);
      y = this.parseVar(y);
      return [`MoveStoredPlace(${map}, ${x}, ${y})`];
    } else {
      return [`MovePlace(${map}, ${x}, ${y})`];
    }
  }

  get JP_NAME() {
    return '場所移動';
  }
}

module.exports = MovePlace;
