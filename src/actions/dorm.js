import {
  DORM_LIST,
  DORM_LIST_SUCCESS,
  DORM_LIST_FAILURE,
  ROOM_LIST,
  ROOM_LIST_SUCCESS,
  ROOM_LIST_FAILURE,
  GET_ROOM,
  GET_ROOM_SUCCESS,
  GET_ROOM_FAILURE,
  COMMENT_EDIT,
  COMMENT_EDIT_SUCCESS,
  COMMENT_EDIT_FAILURE,
  COMMENT_POST,
  COMMENT_POST_SUCCESS,
  COMMENT_POST_FAILURE,
  COMMENT_REMOVE,
  COMMENT_REMOVE_SUCCESS,
  COMMENT_REMOVE_FAILURE
} from './ActionTypes';
import axios from 'axios';

/* DORM LIST */
export function dormListRequest() {
  return dispatch => {
    // inform DORM LIST API is starting
    dispatch(dormList());

    return axios
      .get('/api/dorms/getAllDormitory')
      .then(response => {
        dispatch(dormListSuccess(response.data.results));
      })
      .catch(error => {
        dispatch(dormListFailure());
      });
  };
}

export function dormList() {
  return {
    type: DORM_LIST
  };
}

export function dormListSuccess(dorms) {
  return {
    type: DORM_LIST_SUCCESS,
    dorms
  };
}

export function dormListFailure() {
  return {
    type: DORM_LIST_FAILURE
  }
}

/* ROOM LIST */
export function roomListRequest(dormID) {
  return dispatch => {
    // inform ROOM LIST API is starting
    dispatch(roomList());

    return axios
      .get(`/api/dorms/${dormID}`)
      .then(response => {
        dispatch(roomListSuccess(dormID, response.data.results));
      })
      .catch(error => {
        console.log(error);
        dispatch(roomListFailure());
      });
  }
}

export function roomList() {
  return {
    type: ROOM_LIST
  };
}

export function roomListSuccess(dormID, rooms) {
  return {
    type: ROOM_LIST_SUCCESS,
    dormID,
    rooms
  };
}

export function roomListFailure() {
  return {
    type: ROOM_LIST_FAILURE
  };
}

/* COMMENT LIST */
export function getRoomRequest(dormID, roomID) {
  return dispatch => {
    // inform COMMENT LIST API is starting
    dispatch(getRoom());

    return axios
      .get(`/api/dorms/${roomID}`)
      .then(response => {
        dispatch(getRoomSuccess(dormID, roomID, response.data.roomInfo, response.data.comments));
      })
      .catch(error => {
        dispatch(getRoomFailure());
      });
  }
}

export function getRoom() {
  return {
    type: GET_ROOM
  };
}

export function getRoomSuccess(dormID, roomID, roomInfo, comments) {
  return {
    type: GET_ROOM_SUCCESS,
    dormID,
    roomID,
    roomInfo,
    comments
  };
}

export function getRoomFailure() {
  return {
    type: GET_ROOM_FAILURE
  }
}
