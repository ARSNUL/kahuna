import { combineReducers } from 'redux';
import {
  ADD_USERS, SET_USER, GET_USERS, GET_USER,
} from '../actions/users';

let auth0Users;
auth0Users = [];
if (localStorage.getItem('users')) {
  auth0Users = localStorage.getItem('users');
}

export const initialState = {
  auth0Users,
  currentUser: null,
};

function users(state = initialState, action) {
  switch (action.type) {
    case ADD_USERS:
      return Object.assign({}, state, {
        auth0Users: action.auth0Users,
      });
    case SET_USER:
      return Object.assign({}, state, {
        currentUser: action.user,
      });
    case GET_USER:
      // let foundUser;
      // state.auth0Users.forEach((item) => {
      // if (item.user_id === action.idUser) {
      //   return item;
      // }
      // });
      return state;
    case GET_USERS:
      return state;
    default:
      return state;
  }
}

const usersReducer = combineReducers({
  users,
});

export default usersReducer;
