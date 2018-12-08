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
      .get('/api/account/getPreference')
      .then(response => {
        dispatch(getPreferenceSuccess(response.data.result));
      })
      .catch(error => {
        dispatch(getPreferenceFailure());
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
      .put('/api/account/updatePreference', newUserPref)
      .then(response => {
        dispatch(editPreferenceSuccess());
      })
      .catch(error => {
        dispatch(editPreferenceFailure(error.response.data.code));
      });
  };
}

export function editPref() {
  return {
    type: AUTH_EDIT_PREF
  };
}

export function editPrefSuccess() {
  return {
    type: AUTH_EDIT_PREF_SUCCESS,
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
      .get('/api/account/getProfile')
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
      .put('/api/account/updateProfile', newUserProfile)
      .then(response => {
        dispatch(editProfileSuccess());
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

export function editProfileSuccess() {
  return {
    type: AUTH_EDIT_PROFILE_SUCCESS,
  };
}

export function editProfileFailure() {
  return {
    type: AUTH_EDIT_PROFILE_FAILURE
  };
}
