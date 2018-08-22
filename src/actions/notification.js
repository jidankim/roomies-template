import { CLOSE_NOTIF, OPEN_NOTIF } from './ActionTypes';

export function openNotif(message) {
  return {
    type: OPEN_NOTIF,
    message
  };
}

export function closeNotif() {
  return {
    type: CLOSE_NOTIF
  };
}
