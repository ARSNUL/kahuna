import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { responsiveStoreEnhancer } from 'redux-responsive';
import reducers from './reducers';

export const history = createHistory();

const middlewares = [thunk, routerMiddleware(history)];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducers,
  composeEnhancers(responsiveStoreEnhancer, applyMiddleware(...middlewares)),
);
