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
    case types.AUTH_GET_PREF:
      return update(state, {
        userPref: {
          status: { $set: 'WAITING' },
        }
      });
    case types.AUTH_GET_PREF_SUCCESS:
      return update(state, {
        userPref: {
          status: { $set: 'SUCCESS' },
          data: { $merge: action.userPref }
        }
      });
    case types.AUTH_GET_PREF_FAILURE:
      return update(state, {
        userPref: {
          status: { $set: 'FAILLURE' }
        }
      });
    /* EDIT_PREF */
    case types.AUTH_EDIT_PREF:
      return update(state, {
        editPref: {
          status: { $set: 'WAITING'},
          error: { $set: -1 }
        }
      });
    case types.AUTH_EDIT_PREF_SUCCESS:
      return update(state, {
        editPref: {
          status: { $set: 'SUCCESS' }
        },
        userPref: {
          data: { $merge: action.newUserPref }
        }
      });
    case types.AUTH_EDIT_PREF_FAILURE:
      return update(state, {
        editPref: {
          status: { $set: 'FAILURE' },
          error: { $set: action.error }
        }
      });
    /* GET_PROFILE */
    case types.AUTH_GET_PROFILE:
      return update(state, {
        userProfile: {
          status: { $set: 'WAITING' },
        }
      });
    case types.AUTH_GET_PROFILE_SUCCESS:
      return update(state, {
        userProfile: {
          status: { $set: 'SUCCESS' },
          data: { $merge: action.userProfile }
        }
      });
    case types.AUTH_GET_PROFILE_FAILURE:
      return update(state, {
        userProfile: {
          status: { $set: 'FAILLURE' }
        }
      });
    /* EDIT_PROFILE */
    case types.AUTH__EDIT_PROFILE:
      return update(state, {
        editProfile: {
          status: { $set: 'WAITING'},
          error: { $set: -1 }
        }
      });
    case types.AUTH_EDIT_PROFILE_SUCCESS:
      return update(state, {
        editProfile: {
          status: { $set: 'SUCCESS' }
        },
        userProfile: {
          data: { $merge: action.newUserProfile }
        }
      });
    case types.AUTH_EDIT_PROFILE_FAILURE:
      return update(state, {
        editProfile: {
          status: { $set: 'FAILURE' },
          error: { $set: action.error }
        }
      });
    default:
      return state;
  }
}
