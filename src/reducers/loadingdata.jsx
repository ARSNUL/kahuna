import { combineReducers } from 'redux';
import { SET_IS_LOADING, GET_IS_LOADING } from '../actions/loadingdata';

export const initialState = {
  isLoading: false,
};

function loadingdata(state = initialState, action) {
  switch (action.type) {
    case SET_IS_LOADING:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    case GET_IS_LOADING:
      return state;
    default:
      return state;
  }
}

const loadingReducer = combineReducers({
  loadingdata,
});

export default loadingReducer;
