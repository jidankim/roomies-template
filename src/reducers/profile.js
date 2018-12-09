import * as types from 'actions/ActionTypes';
import update from 'immutability-helper';

const initialState = {
  editPref: {
    status: 'INIT',
    error: -1,
  },
  editProfile: {
    status: 'INIT',
    error: -1,
  },
  userPref: {
    status: 'INIT',
    data: {
      smoker: 'N',
      sleep_start_time: '',
      sleep_end_time: '',
      music_Preference: '',
      hobby: '',
      club: ''
    }
  },
  userProfile: {
    status: 'INIT',
    data: {
      room_id: '',
      first_name: '',
      last_name: '',
      age: 0,
      major: 'undecided',
      phonenumber: ''
    }
  }
};

export default function authentication(state, action) {
  if (typeof state === 'undefined') state = initialState;

  switch (action.type) {
    /* GET_PREF */
    case types.GET_PREF:
      return update(state, {
        userPref: {
          status: { $set: 'WAITING' },
        }
      });
    case types.GET_PREF_SUCCESS:
      return update(state, {
        userPref: {
          status: { $set: 'SUCCESS' },
          data: { $merge: action.userPref }
        }
      });
    case types.GET_PREF_FAILURE:
      return update(state, {
        userPref: {
          status: { $set: 'FAILLURE' }
        }
      });
    /* EDIT_PREF */
    case types.EDIT_PREF:
      return update(state, {
        editPref: {
          status: { $set: 'WAITING'},
          error: { $set: -1 }
        }
      });
    case types.EDIT_PREF_SUCCESS:
      return update(state, {
        editPref: {
          status: { $set: 'SUCCESS' }
        },
        userPref: {
          data: { $merge: action.newUserPref }
        }
      });
    case types.EDIT_PREF_FAILURE:
      return update(state, {
        editPref: {
          status: { $set: 'FAILURE' },
          error: { $set: action.error }
        }
      });
    /* GET_PROFILE */
    case types.GET_PROFILE:
      return update(state, {
        userProfile: {
          status: { $set: 'WAITING' },
        }
      });
    case types.GET_PROFILE_SUCCESS:
      return update(state, {
        userProfile: {
          status: { $set: 'SUCCESS' },
          data: { $merge: action.userProfile }
        }
      });
    case types.GET_PROFILE_FAILURE:
      return update(state, {
        userProfile: {
          status: { $set: 'FAILLURE' }
        }
      });
    /* EDIT_PROFILE */
    case types.EDIT_PROFILE:
      return update(state, {
        editProfile: {
          status: { $set: 'WAITING'},
          error: { $set: -1 }
        }
      });
    case types.EDIT_PROFILE_SUCCESS:
      return update(state, {
        editProfile: {
          status: { $set: 'SUCCESS' }
        },
        userProfile: {
          data: { $merge: action.newUserProfile }
        }
      });
    case types.EDIT_PROFILE_FAILURE:
      return update(state, {
        editProfile: {
          status: { $set: 'FAILURE' },
          error: { $set: action.error }
        }
      });
    case types.MOVE_IN_ROOM:
      return update(state, {
        userProfile: {
          status: { $set: 'WAITING' }
        }
      });
    case types.MOVE_IN_ROOM_SUCCESS:
      return update(state, {
        userProfile: {
          status: { $set: 'SUCCESS' },
          data: { room_id: { $set: action.newRoomID } }
        }
      });
    case types.MOVE_IN_ROOM_FAILURE:
      return update(state, {
        userProfile: {
          status: { $set: 'FAILURE' }
        }
      });
    case types.MOVE_OUT_ROOM:
      return update(state, {
        userProfile: {
          data: { room_id: { $set: '' } }
        }
      });
    default:
      return state;
  }
}
