import * as types from 'actions/ActionTypes';

const initialState = {
  message: '',
  open: false
};

export default function notification(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case types.OPEN_NOTIF:
      return {
        message: action.message,
        open: true
      };
    case types.CLOSE_NOTIF:
      return {
        message: '',
        open: false
      };
    default:
      return state;
  }
}
