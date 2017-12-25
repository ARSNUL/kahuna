import { combineReducers } from 'redux';

const FETCH_USERS = 'FETCH_USERS';
const initialState = {
  users: [],
};

function users(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS:
      return Object.assign({}, state, {
        all: action.users,
      });
    default:
      return state;
  }
}

const usersReducer = combineReducers({
  users,
});

export default usersReducer;
