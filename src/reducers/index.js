import authentication from './authentication';
import event from './event';

import { combineReducers } from 'redux';

export default combineReducers({
    authentication,
    event
});
