/*
 * @providesModule UserStatus
 */

'use strict';

import EventEmitter from 'events';
import moment from 'moment';
import Api from './Api';

import ListenStreak from './ListenStreak';

import { g } from '../constants/Constants';

let serverUserStatus = null;

class UserStatus {

  constructor() {
    this.events = new EventEmitter();
    this._serverStatus = null;
  }

  async fetch() {
    let userStatus = await Api.currentUser();
    if (!userStatus) {
      return;
    }
    let userInfo = userStatus.userInfo;
    this._serverStatus = {
      totalSeconds: userInfo.totalSeconds,
      consecutiveDays: userInfo.consecutiveDays,
      totalSession: userInfo.totalSession
    }
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

  async update(seconds) {
    let status = await this.get();

    // Calculate if we need to update the current streak
    let streak = await ListenStreak.get();
    let currentStreakDays = 0;

    // Streak is increased if the latest streak is capped by yesterday
    if (streak.length == 0) {
      currentStreakDays = 1;
    } else {
      let yesterday = moment().subtract(1, 'day');
      let latestDay = streak[streak.length - 1];
      if (latestDay.isSame(yesterday, 'day')) {
        currentStreakDays = streak.length + 1;
      } else {
        currentStreakDays = streak.length;
      }
    }
    // Calculate new status for update on the server
    let newStatus = {
      totalSeconds: status.totalSeconds + seconds,
      totalSession: status.totalSession + 1,
      consecutiveDays: Math.max(currentStreakDays, status.consecutiveDays)
    }
    let response = await Api.updateUserStatus(newStatus);
    Api.currentUser.clear();
    if (response.success) {
      this.clear();
      let updatedStatus = await this.get();
      this.events.emit('update', updatedStatus);
    } else {
      throw new Error("Error updating user status.");
    }
    return response;
  }

  async subscribe(callback) {
    let status = await this.get();
    callback(status);
    this.events.on('update', callback);
  }

  unsubscribe(callback) {
    this.events.removeListener('update', callback);
  }

}

let instance = new UserStatus();

export default instance;