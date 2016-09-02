/*
 * @providesModule subscribe
 */

'use strict';

import {EventEmitter} from 'events';

class Subscribe {

  constructor() {
    this.subscribeEvents = new EventEmitter();
  }

  show() {
    this.subscribeEvents.emit('show');
    return new Promise((resolve, reject) => {
      this.subscribeEvents.once('hide', resolve);
    });
  }

  hide() {
    this.subscribeEvents.emit('hide');
  }

  addEventListener(event, callback) {
    this.subscribeEvents.on(event, callback);
  }

  removeEventListener(event, callback) {
    this.subscribeEvents.removeListener(event, callback);
  }

}

let subscribe = new Subscribe();

export default subscribe;