import axios from 'axios';
import {
  GET_PREF,
  GET_PREF_SUCCESS,
  GET_PREF_FAILURE,
  EDIT_PREF,
  EDIT_PREF_SUCCESS,
  EDIT_PREF_FAILURE,
  GET_PROFILE,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  EDIT_PROFILE,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAILURE,
  MOVE_IN_ROOM,
  MOVE_IN_ROOM_SUCCESS,
  MOVE_IN_ROOM_FAILURE,
  MOVE_OUT_ROOM
} from './ActionTypes';

/*=======================
    profile
=======================*/

/* GET PREF */
export function getPrefRequest() {
  return dispatch => {
    // Inform Get Pref API is starting
    dispatch(getPref());

    return axios
      .get('/api/profile/getPreference')
      .then(response => {
        dispatch(getPrefSuccess(response.data.result));
      })
      .catch(error => {
        dispatch(getPrefFailure());
      });
  };
}

export function getPref() {
  return {
    type: GET_PREF
  };
}

export function getPrefSuccess(userPref) {
  return {
    type: GET_PREF_SUCCESS,
    userPref
  };
}

export function getPrefFailure() {
  return {
    type: GET_PREF_FAILURE
  };
}

/* EDIT PREF */
export function editPrefRequest(newUserPref) {
  return dispatch => {
    // Inform Edit Pref API is starting
    dispatch(editPref());

    return axios
      .put('/api/profile/updatePreference', newUserPref)
      .then(response => {
        dispatch(editPrefSuccess(response.data.result));
      })
      .catch(error => {
        dispatch(editPrefFailure());
      });
  };
}

export function editPref() {
  return {
    type: EDIT_PREF
  };
}

export function editPrefSuccess(newUserPref) {
  return {
    type: EDIT_PREF_SUCCESS,
    newUserPref
  };
}

export function editPrefFailure() {
  return {
    type: EDIT_PREF_FAILURE
  };
}

/* GET PROFILE */
export function getProfileRequest() {
  return dispatch => {
    // Inform Get Profile API is starting
    dispatch(getProfile());

    return axios
      .get('/api/profile/getProfile')
      .then(response => {
        dispatch(getProfileSuccess(response.data.result));
      })
      .catch(error => {
        dispatch(getProfileFailure());
      });
  };
}

export function getProfile() {
  return {
    type: GET_PROFILE
  };
}

export function getProfileSuccess(userProfile) {
  return {
    type: GET_PROFILE_SUCCESS,
    userProfile
  };
}

export function getProfileFailure() {
  return {
    type: GET_PROFILE_FAILURE
  };
}

/* EDIT PROFILE */
export function editProfileRequest(newUserProfile) {
  return dispatch => {
    // Inform Edit Profile API is starting
    dispatch(editProfile());

    return axios
      .put('/api/profile/updateProfile', newUserProfile)
      .then(response => {
        dispatch(editProfileSuccess(response.data.result));
      })
      .catch(error => {
        dispatch(editProfileFailure());
      });
  };
}

export function editProfile() {
  return {
    type: EDIT_PROFILE
  };
}

export function editProfileSuccess(newUserProfile) {
  return {
    type: EDIT_PROFILE_SUCCESS,
    newUserProfile
  };
}

export function editProfileFailure() {
  return {
    type: EDIT_PROFILE_FAILURE
  };
}

/* Move In */
export function moveInRequest(room_id) {
  return dispatch => {
    // Inform Move In API is starting
    dispatch(moveIn());

    return axios
      .put('/api/profile/moveIntoRoom', { room_id })
      .then(response => {
        dispatch(moveInSuccess(response.data.result));
      })
      .catch(error => {
        dispatch(moveInFailure());
      });
  };
}

export function moveIn() {
  return {
    type: MOVE_IN_ROOM
  };
}

export function moveInSuccess(newRoomID) {
  return {
    type: MOVE_IN_ROOM_SUCCESS,
    newRoomID
  };
}

export function moveInFailure() {
  return {
    type: MOVE_IN_ROOM_FAILURE
  };
}

/* MOVE OUT */
export function moveOutRequest() {
  return dispatch => {
    return axios.put('/api/profile/moveOutOfRoom').then(response => {
        dispatch(moveOut());
    });
  };
}

export function moveOut() {
  return {
    type: MOVE_OUT_ROOM
  };
}
