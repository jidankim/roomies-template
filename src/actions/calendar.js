import { UPDATE_MONTH } from './ActionTypes';

export function updateMonth(month) {
  return {
    type: UPDATE_MONTH,
    month
  };
}
