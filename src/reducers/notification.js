import * as types from 'actions/ActionTypes';

const initialState = {
  open: false
};

export default function notification(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case types.OPEN_NOTIF:
      return { open: true };
    case types.CLOSE_NOTIF:
      return { open: false };
    default:
      return state;
  }
}
