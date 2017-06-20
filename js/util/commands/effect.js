'use strict';

const Command = require('../command');
class Effect extends Command {

  run(animeId, eventId, wait = true) {
    this.writeLog(`animeId: ${animeId}, eventId: ${eventId}, wait: ${wait}`);

    return true;
  }

  output(animeId, eventId, wait = true) {
    return [`Anim(${animeId}, ${eventId}, ${wait ? 1 : 0}, 0)`];
  }

  get JP_NAME() {
    return '戦闘アニメの表示';
  }
}

module.exports = Effect;
