import { CLOSE_NOTIF, OPEN_NOTIF } from './ActionTypes';

export function openNotif(message, variant) {
  return {
    type: OPEN_NOTIF,
    message,
    variant
  };
}

export function closeNotif() {
  return {
    type: CLOSE_NOTIF
  };
}
