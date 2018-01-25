import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { createResponsiveStateReducer } from 'redux-responsive';
import authentication from './authentication';
import users from './users';
import loadingdata from './loadingdata';

const combination = combineReducers({
  loadingdata,
  users,
  authentication,
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
