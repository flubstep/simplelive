/*
 * @providesModule ListenInfo
 */

'use strict';

import EventEmitter from 'events';
import Api from './Api';

import { values } from 'lodash';

import { g } from '../constants/Constants';


class ListenInfo {

  constructor() {
    this.events = new EventEmitter();
    this._serverStatus = null;
  }

  async fetch() {
    let fullListenInfo = await Api.fullListenInfo();
    if (!fullListenInfo) {
      return;
    }
    this._serverStatus = fullListenInfo;
  }

  clear() {
    this._serverStatus = null;
  }

  async get() {
    if (!this._serverStatus) {
      await this.fetch();
    }
    return this._serverStatus;
  }

  async complete(type, parent, child) {
    let response = await Api.complete.post({
      item: child,
      item2: parent,
      type: type
    });
    if (response.success) {
      Api.listenHistory.get.clear();
      this.clear();
      let updatedInfo = await this.get();
      this.events.emit('update', updatedInfo);
    } else {
      throw new Error("Error updating listen info.");
    }
    return response;
  }

  async subscribe(callback) {
    let listenInfo = await this.get();
    callback(listenInfo);
    this.events.on('update', callback);
  }

  unsubscribe(callback) {
    this.events.removeListener('update', callback);
  }

}

let instance = new ListenInfo();

export default instance;