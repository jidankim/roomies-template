import * as types from 'actions/ActionTypes';
import update from 'immutability-helper';

const initialState = {
  userPref: {
    status: 'INIT',
    error: -1,
    data: {
      smoker: 'N',
      sleep_start_time: '',
      sleep_end_time: '',
      music_preference: '',
      hobby: '',
      club: ''
    }
  },
  userProfile: {
    room_id: '',
    first_name: '',
    last_name: '',
    age: 0,
    major: 'undecided',
    phonenumber: ''
  }
};

export default function authentication(state, action) {
  if (typeof state === 'undefined') state = initialState;

  switch (action.type) {
    /* GET_PREF */
    case types.AUTH_GET_PREF:
      return update(state, {
        // status: {
        //   isLoggedIn: { $set: true }
        // }
      });
    case types.AUTH_GET_PREF_SUCCESS:
      return update(state, {
        userPref: { $merge: action.userPref },
        // status: {
        //   valid: { $set: true },
        //   currentUser: { $set: action.userPref.student_id },
        // }
      });
    case types.AUTH_GET_PREF_FAILURE:
      return update(state, {
        // status: {
        //   valid: { $set: false },
        //   isLoggedIn: { $set: false }
        // }
      });
    /* EDIT_PREF */
    case types.AUTH_EDIT_PREF:
      return update(state, {
        // status: {
        //   isLoggedIn: { $set: true }
        // }
      });
    case types.AUTH_EDIT_PREF_SUCCESS:
      return update(state, {
        // userPref: { $merge: action.userPref },
        // status: {
        //   valid: { $set: true },
        //   currentUser: { $set: action.userPref.student_id },
        // }
      });
    case types.AUTH_EDIT_PREF_FAILURE:
      return update(state, {
        // status: {
        //   valid: { $set: false },
        //   isLoggedIn: { $set: false }
        // }
      });
    /* GET_PROFILE */
    case types.AUTH_GET_PROFILE:
      return update(state, {
        // status: {
        //   isLoggedIn: { $set: true }
        // }
      });
    case types.AUTH_GET_PROFILE_SUCCESS:
      return update(state, {
        userProfile: { $merge: action.userProfile },
        // status: {
        //   valid: { $set: true },
        //   currentUser: { $set: action.userProfile.studentID },
        // }
      });
    case types.AUTH_GET_PROFILE_FAILURE:
      return update(state, {
        // status: {
        //   valid: { $set: false },
        //   isLoggedIn: { $set: false }
        // }
      });
    /* EDIT_PROFILE */
    case types.AUTH__EDIT_PROFILE:
      return update(state, {
        // status: {
        //   isLoggedIn: { $set: true }
        // }
      });
    case types.AUTH_EDIT_PROFILE_SUCCESS:
      return update(state, {
        userProfile: { $merge: action.userProfile },
        // status: {
        //   valid: { $set: true },
        //   currentUser: { $set: action.userProfile.studentID },
        // }
      });
    case types.AUTH_EDIT_PROFILE_FAILURE:
      return update(state, {
        // status: {
        //   valid: { $set: false },
        //   isLoggedIn: { $set: false }
        // }
      });
    default:
      return state;
  }
}
