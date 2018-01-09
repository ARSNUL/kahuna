import { combineReducers } from 'redux';
import { ADD_USERS, GET_USERS } from '../actions/users';

export const initialState = {
  users: [],
};

function users(state = initialState, action) {
  switch (action.type) {
    case ADD_USERS:
      return Object.assign({}, state, {
        users: action.users,
      });
    case GET_USERS:
      return Object.assign({}, state, {
        users: action.users,
      });
    default:
      return state;
  }
}

const usersReducer = combineReducers({
  users,
});

export default usersReducer;
