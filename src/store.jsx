import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { responsiveStoreEnhancer } from 'redux-responsive';

import rootReducer from './reducers';

export const history = createHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [thunk, routerMiddleware(history)];

export const store = createStore(
  rootReducer,
  composeEnhancers(responsiveStoreEnhancer, applyMiddleware(...middlewares)),
);
