import authentication from './authentication';
import calendar from './calendar';
import event from './event';
import notification from './notification';
import profile from './profile';

import { combineReducers } from 'redux';

export default combineReducers({
  authentication,
  calendar,
  event,
  notification,
  profile
});
