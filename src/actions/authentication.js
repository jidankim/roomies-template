import axios from 'axios';
import {
  AUTH_LOGIN,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_REGISTER,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_FAILURE,
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
  AUTH_EDIT_PROFILE_FAILURE,
  AUTH_GET_STATUS,
  AUTH_GET_STATUS_SUCCESS,
  AUTH_GET_STATUS_FAILURE,
  AUTH_LOGOUT
} from './ActionTypes';

/*=======================
    authentication
=======================*/

/* LOGIN */
export function loginRequest(studentID, password) {
  return dispatch => {
    // Inform Login API is starting
    dispatch(login());

    // API REQUEST
    return axios
      .post('/api/account/signin', { studentID, password })
      .then(response => {
        // SUCCEED
        dispatch(loginSuccess(studentID));
      })
      .catch(error => {
        // FAILED
        dispatch(loginFailure());
      });
  };
}

export function login() {
  return {
    type: AUTH_LOGIN
  };
}

export function loginSuccess(studentID) {
  return {
    type: AUTH_LOGIN_SUCCESS,
    studentID
  };
}

export function loginFailure() {
  return {
    type: AUTH_LOGIN_FAILURE
  };
}

/* REGISTER */
export function registerRequest(studentID, password, firstName, lastName, age, major, phoneNumber) {
  return dispatch => {
    // Inform Register API is starting
    dispatch(register());

    return axios
      .post('/api/account/signup', { studentID, password, firstName, lastName, age, major, phoneNumber })
      .then(response => {
        dispatch(registerSuccess());
      })
      .catch(error => {
        dispatch(registerFailure(error.response.data.code));
      });
  };
}

export function register() {
  return {
    type: AUTH_REGISTER
  };
}

export function registerSuccess() {
  return {
    type: AUTH_REGISTER_SUCCESS
  };
}

export function registerFailure(error) {
  return {
    type: AUTH_REGISTER_FAILURE,
    error
  };
}

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

/* GET STATUS */
export function getStatusRequest() {
  return dispatch => {
    // Inform Get Status API is starting
    dispatch(getStatus());

    return axios
      .get('/api/account/getInfo')
      .then(response => {
        dispatch(getStatusSuccess(response.data.info.username));
      })
      .catch(error => {
        dispatch(getStatusFailure());
      });
  };
}

export function getStatus() {
  return {
    type: AUTH_GET_STATUS
  };
}

export function getStatusSuccess(username) {
  return {
    type: AUTH_GET_STATUS_SUCCESS,
    username
  };
}

export function getStatusFailure() {
  return {
    type: AUTH_GET_STATUS_FAILURE
  };
}

/* Logout */
export function logoutRequest() {
  return dispatch => {
    return axios.post('/api/account/logout').then(response => {
      dispatch(logout());
    });
  };
}

export function logout() {
  return {
    type: AUTH_LOGOUT
  };
}
