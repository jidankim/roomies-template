import * as types from 'actions/ActionTypes';
import update from 'immutability-helper';

const initialState = {
  postComment: {
    status: 'INIT',
    error: -1
  },
  list: {
    status: 'INIT',
    data: {}
  },
  editComment: {
    status: 'INIT',
    error: -1
  },
  removeComment: {
    status: 'INIT',
    error: -1
  }
};

export default function event(state, action) {
  if (typeof state === 'undefined') {
    state = initialState;
  }

  console.log(action);
  switch (action.type) {
    case types.DORM_LIST:
      return update(state, {
        list: {
          status: { $set: 'WAITING' }
        }
      });
    case types.DORM_LIST_SUCCESS:
      return update(state, {
        list: {
          status: { $set: 'SUCCESS' },
          data: { $add: [action.dorms].map(d => {
            let { dorm_id, ...other } = d;
            return [ dorm_id, other ];
          }) }
        }
      });
    case types.DORM_LIST_FAILURE:
      return update(state, {
        list: {
          status: { $set: 'FAILURE' }
        }
      });
    case types.ROOM_LIST:
      return update(state, {
        list: {
          status: { $set: 'WAITING' }
        }
      });
    case types.ROOM_LIST_SUCCESS:
      return update(state, {
        list: {
          status: { $set: 'SUCCESS' },
          data: { [action.dormID]:
            { 'rooms':
              { $add: [acion.rooms].map(r => {
                let { room_id, dorm_id, ...other } = r;
                return [room_id, other ]; })
              }
            }
          }
        }
      });
    case types.ROOM_LIST_FAILURE:
      return update(state, {
        list: {
          status: { $set: 'FAILURE' }
        }
      });
    case types.GET_ROOM:
      return update(state, {
        list: {
          status: { $set: 'WAITING' }
        }
      });
    case types.GET_ROOM_SUCCESS:
      return update(state, {
        list: {
          status: { $set: 'SUCCESS' },
          data: { [action.dormID]:
            { 'rooms':
              { [action.roomID]:
                { $merge: action.roomInfo, 'comments': { $add: [acion.comments] } }
              }
            }
          }
        }
      });
    case types.GET_ROOM_FAILURE:
      return update(state, {
        list: {
          status: { $set: 'FAILURE' }
        }
      });
    default:
      return state;
  }
}
