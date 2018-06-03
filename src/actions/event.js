import {
    EVENT_POST,
    EVENT_POST_SUCCESS,
    EVENT_POST_FAILURE
} from './ActionTypes';
import axios from 'axios';

/* EVENT POST */
export function eventPostRequest(contents) {
    return (dispatch) => {
        // inform EVENT POST API is starting
        dispatch(eventPost());

        return axios.post('/api/event/', { contents })
        .then((respose) => {
            dispatch(memoPostSuccess());
        }).catch((error) => {
            dispatch(memoPostFailure(error.response.data.code));
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
