import * as types from 'actions/ActionTypes';

const initialState = {
  message: '',
  open: false,
  variant: ''
};

export default function notification(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case types.OPEN_NOTIF:
      return {
        message: action.message,
        open: true,
        variant: action.variant
      };
    case types.CLOSE_NOTIF:
      return {
        ...state,
        open: false
      };
    default:
      return state;
  }
}
