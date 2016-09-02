/*
 * @providesModule ListenStreak
 */

'use strict';

import EventEmitter from 'events';
import Api from './Api';
import ListenInfo from './ListenInfo';

import moment from 'moment';
import { values, sortBy } from 'lodash';

import { g } from '../constants/Constants';


function calculateStreak(days) {
  // Early exit to prevent index error
  if (days.length == 0) {
    return [];
  }

  // Sort days by time in descending order
  days = sortBy(days, (day) => -day.unix());
  let today = moment();
  let streak = [];

  // Start calculating the current streak from today or yesterday.
  if (
      days[0].isSame(today, 'day') ||
      days[0].isSame(today.subtract(1, 'day'), 'day')
    ) {
    streak.unshift(days.shift());
    while (days.length > 0) {
      let next = days.shift();
      if (next.isSame(streak[0], 'day')) {
        // Skip if the day matches
        continue;
      } else if (next.isSame(streak[0].subtract(1, 'day'), 'day')) {
        // Prepend the day if the next matches
        streak.unshift(next);
      } else {
        break;
      }
    }
    return streak;
  } else {
    return [];
  }
}


class ListenStreak {

  constructor() {
    this.events = new EventEmitter();
    this.lastValue = null;
    ListenInfo.subscribe((info) => this.updateStreak(info));
  }

  updateStreak(listenInfo) {
    let days = values(listenInfo).map((i) => i.listenDate);
    let streak = calculateStreak(days);
    this.lastValue = streak;
    this.events.emit('update', streak);
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

let instance = new ListenStreak();

export default instance;