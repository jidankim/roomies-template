import * as types from 'actions/ActionTypes';
import moment from 'moment';
import update from 'immutability-helper';

const initialState = {
  // today is set when app is loaded and does not change
  today: {
    date: moment(),
    year: moment().year(),
    month: moment().format('MMMM'),
    // index is 0-based
    monthIndex: moment().month() + 1,
    dayIndex: moment().date()
  },
  // display is the date information that is currently displayed by calendar
  displayed: {
    date: moment(),
    year: moment().year(),
    month: moment().format('MMMM'),
    monthIndex: moment().month() + 1,
    dayIndex: moment().date()
  }
};

export default function calendar(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case types.UPDATE_MONTH:
      return update(state, {
        displayed: {
          month: {
            $set: moment()
              .month(action.month - 1)
              .format('MMMM')
          },
          monthIndex: { $set: action.month }
        }
      });
    default:
      return state;
  }
}
