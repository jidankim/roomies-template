import authentication from './authentication';
import dorm from './dorm';
import notification from './notification';
import profile from './profile';

import { combineReducers } from 'redux';

export default combineReducers({
  authentication,
  dorm,
  notification,
  profile
});
