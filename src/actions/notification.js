import { CLOSE_NOTIF, OPEN_NOTIF } from './ActionTypes';

export function openNotif() {
  return {
    type: OPEN_NOTIF
  };
}

export function closeNotif() {
  return {
    type: CLOSE_NOTIF
  };
}
