/*
 * @providesModule player
 */

'use strict';

import {EventEmitter} from 'events';

class Player {

  constructor() {
    this.playerEvents = new EventEmitter();
  }

  play(props) {
    this.playerEvents.emit('play', props);
    return new Promise((resolve, reject) => {
      this.playerEvents.once('close', resolve);
    });
  }

  close() {
    this.playerEvents.emit('close');
  }

  addEventListener(event, callback) {
    this.playerEvents.on(event, callback);
  }

}

let player = new Player();

export default player;