import { combineReducers } from 'redux';
// import { Map } from 'immutable';
import { SET_IS_CREATING, GET_IS_CREATING } from '../actions/creatinguser';

export const initialState = {
  isCreating: false,
};

function creatinguser(state = initialState, action) {
  switch (action.type) {
    case SET_IS_CREATING:
      // return state.set('isCreating', action.isCreating);
      return Object.assign({}, state, {
        isCreating: action.isCreating,
      });

    case GET_IS_CREATING:
      return state;

    default:
      return state;
  }
}

const creatingReducer = combineReducers({
  creatinguser,
});

export default creatingReducer;
