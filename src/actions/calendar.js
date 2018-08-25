import { UPDATE_FILTER, UPDATE_MONTH } from './ActionTypes';

export function updateFilter(filter) {
  return {
    type: UPDATE_FILTER,
    filter
  }
}

export function updateMonth(month) {
  return {
    type: UPDATE_MONTH,
    month
  };
}
