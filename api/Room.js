/**
 * @providesModule Room
 */

import EventEmitter from 'events';
import firebase from Firebase;

class Room {

  constructor(uuid, userInfo) {
    this.uuid = uuid;
    this.userId = userInfo._id;
    this.userName = userInfo.fullName;
    this.events = new EventEmitter();
    this.ref = new Firebase('');
    this.ref.child('state').on('value', (s) => this.handleStateUpdate(s))
    this.ref.child('events').on('addChild', (s) => this.handleEventAdd(s))
  }

  handleStateUpdate(store) {
    let value = store.val();
  }

  handleEventAdd(store) {
    // ...
  }

  create() {
    this.ref.child('state').transaction((prevState) => {
      return Object.assign({}, prevState, {
        owner: this.userId,
        state: 'choosing',
        file: null,
        members: {
          this.userId: {
            name: this.userName,
            role: 'owner'
          }
        }
      })
    });
  }

  join() {
    let membership = this.ref.child('state/members').child(this.userId);
    membership.set({
      name: this.userName,
      role: 'member'
    })
    membership.onDisconnect().remove();
  }

  setFile(file) {
    this.ref.child('state/file').set(file);
  }

  setPlaying(newState) {
    this.ref.child('state/playing').set(newState);
  }

  ping() {
    let t = (new Date()).toISOString();
    this.ref.child('events').push({
      type: 'ping',
      userId: this.userId,
      time: t
    });
  }

  subscribe(event, callback) {
    this.events.on(event, callback);
  }

}

export default Room;