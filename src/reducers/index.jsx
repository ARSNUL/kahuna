import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { createResponsiveStateReducer } from 'redux-responsive';
import auth from './auth';
import users from './users';

const combination = combineReducers({
  users,
  auth,
  routing: routerReducer,
  browser: createResponsiveStateReducer({
    phonePortrait: 320,
    phone: 568,
    tabletPortrait: 768,
    tablet: 1025,
    desktop: 1280,
    giant: 1600,
  }),
});

export default combination;
