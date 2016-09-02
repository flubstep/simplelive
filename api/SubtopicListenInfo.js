/*
 * @providesModule SubtopicListenInfo
 */

'use strict';

import EventEmitter from 'events';
import Api from './Api';
import ListenInfo from './ListenInfo';

import moment from 'moment';
import { values, sortBy } from 'lodash';

import { g } from '../constants/Constants';


class SubtopicListenInfo {

  constructor() {
    this.events = new EventEmitter();
    this.events.setMaxListeners(512);
    this.lastValue = null;
    ListenInfo.subscribe((info) => this.update(info));
  }

  update(listenInfo) {
    let subtopicMap = {};
    listenInfo.forEach((listen) => {
      subtopicMap[listen.item2] = listen;
    });
    this.lastValue = subtopicMap;
    this.events.emit('update', subtopicMap);
  }

  subscribe(callback) {
    if (this.lastValue) {
      callback(this.lastValue);
    }
    this.events.on('update', callback);
  }

  unsubscribe(callback) {
    this.events.removeListener('update', callback);
  }

  get() {
    return new Promise((resolve, reject) => {
      if (this.lastValue) {
        resolve(this.lastValue);
      } else {
        this.events.once('update', resolve);
      }
    });
  }

}

let instance = new SubtopicListenInfo();

export default instance;