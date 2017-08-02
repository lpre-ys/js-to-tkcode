'use strict';

const Command = require('../command');
class StorePlace extends Command {

  run(mapId, x, y) {
    this.writeLog(`mapId: ${mapId}, x: ${x}, y: ${y}`);

    return true;
  }

  output(mapId, x, y) {
    mapId = this.parseVar(mapId);
    x = this.parseVar(x);
    y = this.parseVar(y);
    return [`StorePlace(${mapId}, ${x}, ${y})`];
  }

  get JP_NAME() {
    return '現在の場所を記憶';
  }
}

module.exports = StorePlace;
