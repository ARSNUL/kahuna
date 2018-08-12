import { combineReducers } from 'redux';
import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS,
} from '../actions/authentication';

let isAuthenticated = false;
if (localStorage.getItem('id_token')) {
  if ((parseInt(localStorage.getItem('expires_at'), 10) * 1000) > new Date().getTime()) {
    isAuthenticated = true;
  }
}

export const initialState = {
  isFetching: false,
  isAuthenticated,
};

function authentication(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: action.creds,
      });

    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: '',
      });

    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message,
      });

    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
      });

    default:
      return state;
  }
}

const authReducer = combineReducers({
  authentication,
});

export default authReducer;
