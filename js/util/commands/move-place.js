'use strict';

const Command = require('../command');
class MovePlace extends Command {

  run(map, x, y) {
    this.writeLog(`map[${map}], x[${x}], y[${y}]`);

    return true;
  }

  output(map, x, y) {
    return [`MovePlace(${map}, ${x}, ${y})`];
  }

  get JP_NAME() {
    return '場所移動';
  }
}

module.exports = MovePlace;
