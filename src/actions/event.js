import {
    EVENT_POST,
    EVENT_POST_SUCCESS,
    EVENT_POST_FAILURE,
    EVENT_LIST,
    EVENT_LIST_SUCCESS,
    EVENT_LIST_FAILURE
} from './ActionTypes';
import axios from 'axios';

/* EVENT POST */
export function eventPostRequest(contents) {
    return (dispatch) => {
        // inform EVENT POST API is starting
        dispatch(eventPost());

        return axios.post('/api/event/', { contents })
        .then((respose) => {
            dispatch(eventPostSuccess());
        }).catch((error) => {
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
        - isInitial: whether it is for initial loading
        - listType: OPTIONAL; loading 'old' event of 'new' event
        - id: OPTIONAL; event id (one at the bottom or one at the top)
        - username: OPTIONAL; find events of following user
*/
export function eventListRequest(isInitial, listType, id, username) {
    return (dispatch) => {
        // inform event list API is starting
        dispatch(eventList());

        let url = '/api/event';

        if (typeof username === "undefined") {
          // username not given, load public events
          url = isInitial ? url : `${url}/${listType}/${id}`;
        } else {
          // load events of specific user
        }

        return axios.get(url)
        .then((response) => {
            dispatch(eventListSuccess(response.data, isInitial, listType));
        }).catch((error) => {
            dispatch(eventListFailure());
        });
    };
}

export function eventList() {
    return {
        type: EVENT_LIST
    };
}

export function eventListSuccess(data, isInitial, listType) {
    return {
        type: EVENT_LIST_SUCCESS,
        data,
        isInitial,
        listType
    };
}

export function eventListFailure() {
    return {
        type: EVENT_LIST_FAILURE
    };
}
