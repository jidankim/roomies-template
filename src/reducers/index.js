import authentication from './authentication';
import event from './event';
import notification from './notification';

import { combineReducers } from 'redux';

export default combineReducers({
  authentication,
  event,
  notification
});
