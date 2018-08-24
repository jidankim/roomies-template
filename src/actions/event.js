import {
  EVENT_POST,
  EVENT_POST_SUCCESS,
  EVENT_POST_FAILURE,
  EVENT_LIST,
  EVENT_LIST_SUCCESS,
  EVENT_LIST_FAILURE,
  EVENT_EDIT,
  EVENT_EDIT_SUCCESS,
  EVENT_EDIT_FAILURE,
  EVENT_REMOVE,
  EVENT_REMOVE_SUCCESS,
  EVENT_REMOVE_FAILURE
} from './ActionTypes';
import axios from 'axios';

/* EVENT POST */
export function eventPostRequest(contents) {
  return dispatch => {
    // inform EVENT POST API is starting
    dispatch(eventPost());

    return axios
      .post('/api/event/', contents)
      .then(respose => {
        dispatch(eventPostSuccess());
      })
      .catch(error => {
        dispatch(eventPostFailure(error.response.data.code));
      });
  };
}

export function eventPost() {
  return {
    type: EVENT_POST
  };
}

export function eventPostSuccess() {
  return {
    type: EVENT_POST_SUCCESS
  };
}

export function eventPostFailure(error) {
  return {
    type: EVENT_POST_FAILURE,
    error
  };
}

/* EVENT LIST */

/*
    Parameter:
        - month: month that is displayed
        - category OPTIONAL WILL BE IMPLEMENTED
*/
export function eventListRequest(month, category) {
  return dispatch => {
    // inform event list API is starting
    dispatch(eventList());

    let url = `/api/event/${month}`;

    // if (typeof username === 'undefined') {
    //   // username not given, load public events
    //   url = isInitial ? url : `${url}/${listType}/${id}`;
    // } else {
    //   // load events of specific user
    // }

    return axios
      .get(url)
      .then(response => {
        dispatch(eventListSuccess(response.data));
      })
      .catch(error => {
        dispatch(eventListFailure());
      });
  };
}

export function eventList() {
  return {
    type: EVENT_LIST
  };
}

export function eventListSuccess(data) {
  return {
    type: EVENT_LIST_SUCCESS,
    data
  };
}

export function eventListFailure() {
  return {
    type: EVENT_LIST_FAILURE
  };
}

/* EVENT EDIT */
export function eventEditRequest(id, index, contents) {
  return dispatch => {
    dispatch(eventEdit());

    return axios
      .put('/api/event/' + id, contents)
      .then(response => {
        dispatch(eventEditSuccess(index, response.data.event));
      })
      .catch(error => {
        dispatch(eventEditFailure(error.response.data.code));
      });
  };
}

export function eventEdit() {
  return {
    type: EVENT_EDIT
  };
}

export function eventEditSuccess(index, event) {
  return {
    type: EVENT_EDIT_SUCCESS,
    index,
    event
  };
}

export function eventEditFailure(error) {
  return {
    type: EVENT_EDIT_FAILURE,
    error
  };
}

/* EVENT REMOVE */
export function eventRemoveRequest(id, index) {
  return dispatch => {
    dispatch(eventRemove());

    return axios
      .delete('/api/event/' + id)
      .then(response => {
        dispatch(eventRemoveSuccess(index));
      })
      .catch(error => {
        dispatch(eventRemoveFailure(error.response.data.code));
      });
  };
}

export function eventRemove() {
  return {
    type: EVENT_REMOVE
  };
}

export function eventRemoveSuccess(index) {
  return {
    type: EVENT_REMOVE_SUCCESS,
    index
  };
}

export function eventRemoveFailure(error) {
  return {
    type: EVENT_REMOVE_FAILURE,
    error
  };
}
