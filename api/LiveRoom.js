import { EventEmitter } from 'events';
import { s } from '../constants/Constants';
import { find, keys } from 'lodash';

/*
  room: 
    state: selecting | selected | playing | paused | completed
    meditations: list of subtopics
    selectedIndex: int
    filepath: filename of S3 file
    participants: dict of user-id -> user
    host: user

  subtopic:
    ???

  user:
    id: string
    name: string
    ready: boolean
*/

function userKeyValue(user) {
  // Gotta do this to prevent JS syntax from freaking out
  let newDict = {};
  newDict[user.id] = user;
  return newDict;
}

const reducers = {

  RESET_ROOM: (state, action) => {
    return {
      state: 'selecting',
      meditations: action.meditations,
      selectedIndex: 0,
      filepath: null,
      participants: userKeyValue(action.user),
      host: action.user.id
    }
  },

  // action.user
  // action.meditations
  HOST_ROOM: (state, action) => {
    if (!state) {
      return {
        state: 'selecting',
        meditations: action.meditations,
        selectedIndex: 0,
        filepath: null,
        participants: userKeyValue(action.user),
        host: action.user.id
      }
    } else {
      return state;
    }
  },

  // action.user
  JOIN_ROOM: (state, action) => {
    if (!state) {
      console.error("Invalid game state to be joining room.");
      return state;
    }
    let user = s(action.user, { ready: false });
    return {
      participants: s(state.participants, userKeyValue(user))
    }
  },

  // action.selectedIndex
  LOOK_AT_MEDITATION: (state, action) => {
    return {
      selectedIndex: action.selectedIndex
    }
  },

  // action.filepath
  // action.index
  CHOOSE_MEDITATION: (state, action) => {
    return {
      state: 'selected',
      filepath: action.filepath,
      selectedIndex: action.index
    }
  },

  UNCHOOSE_MEDITATION: (state, action) => {
    return {
      state: 'selecting',
      filepath: null
    }
  },

  // action.user
  // action.ready
  SET_READY: (state, action) => {
    if (!state) {
      console.warn("No state when SET_READY was called.")
      return state;
    }
    let user = s(action.user, { ready: action.ready });
    return {
      participants: s(state.participants, userKeyValue(user))
    }
  },

  PLAY: (state, action) => {
    // todo: permissions?
    return {
      state: 'playing'
    }
  },

  PAUSE: (state, action) => {
    // todo: permissions?
    return {
      state: 'paused'
    }
  },

  COMPLETE: (state, action) => {
    // todo: permissions?
    return {
      state: 'completed'
    }
  }

}

class LiveRoom {

  constructor(room) {
    this.ref = firebase.database().ref('live');
    this.roomRef = this.ref.child(room).child('room');
    this.eventRef = this.ref.child(room).child('events');
    this.events = new EventEmitter();
  }

  removeRoomOnDisconnect() {
    this.roomRef.onDisconnect().remove();
    this.eventRef.onDisconnect().remove();
  }

  removeUserOnDisconnect(userId) {
    this.roomRef.child('participants').child(userId).onDisconnect().remove();
  }

  subscribe(callback) {
    // todo: unsubscribe?
    this.roomRef.on('value', (store) => {
      callback(store.val());
    });
  }

  onPing(callback) {
    this.eventRef.on('child_added', (store) => {
      callback(store.val());
    });
  }

  ping(event) {
    this.eventRef.push(event);
  }

  emit(action) {
    let fn = reducers[action.type];
    this.roomRef.transaction((state) => {
      console.log('emitting', action.type, action);
      let updateDict = fn(state, action);
      let newState = s(state, updateDict);
      return newState;
    });
  }
}

LiveRoom.onRoomList = (callback) => {
  // TODO: This does not scale at all.
  firebase.database().ref('live').on('value', (store) => {
    let value = store.val();
    let ret = [];
    keys(value).forEach((roomId) => {
      let room = value[roomId].room;
      let info = {
        id: roomId,
        host: room.participants[room.host],
        numParticipants: keys(room.participants).length
      };
      if (info.host && info.host.name) {
        ret.push(info)
      }
    });
    callback(ret);
  });
}

export default LiveRoom;