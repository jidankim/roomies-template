import axios from 'axios';
import {
  AUTH_GET_PREF,
  AUTH_GET_PREF_SUCCESS,
  AUTH_GET_PREF_FAILURE,
  AUTH_EDIT_PREF,
  AUTH_EDIT_PREF_SUCCESS,
  AUTH_EDIT_PREF_FAILURE,
  AUTH_GET_PROFILE,
  AUTH_GET_PROFILE_SUCCESS,
  AUTH_GET_PROFILE_FAILURE,
  AUTH_EDIT_PROFILE,
  AUTH_EDIT_PROFILE_SUCCESS,
  AUTH_EDIT_PROFILE_FAILURE
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
    type: AUTH_GET_PREF
  };
}

export function getPrefSuccess(userPref) {
  return {
    type: AUTH_GET_PREF_SUCCESS,
    userPref
  };
}

export function getPrefFailure() {
  return {
    type: AUTH_GET_PREF_FAILURE
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
        dispatch(editPrefFailure(error.response.data.code));
      });
  };
}

export function editPref() {
  return {
    type: AUTH_EDIT_PREF
  };
}

export function editPrefSuccess(newUserPref) {
  return {
    type: AUTH_EDIT_PREF_SUCCESS,
    newUserPref
  };
}

export function editPrefFailure() {
  return {
    type: AUTH_EDIT_PREF_FAILURE
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
    type: AUTH_GET_PROFILE
  };
}

export function getProfileSuccess(userProfile) {
  return {
    type: AUTH_GET_PROFILE_SUCCESS,
    userProfile
  };
}

export function getProfileFailure() {
  return {
    type: AUTH_GET_PROFILE_FAILURE
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
    type: AUTH_EDIT_PROFILE
  };
}

export function editProfileSuccess(newUserProfile) {
  return {
    type: AUTH_EDIT_PROFILE_SUCCESS,
    newUserProfile
  };
}

export function editProfileFailure() {
  return {
    type: AUTH_EDIT_PROFILE_FAILURE
  };
}
