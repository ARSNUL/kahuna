export const GET_IS_CREATING = 'GET_IS_CREATING';
export const SET_IS_CREATING = 'SET_IS_CREATING';

export const getIsCreating = () => (dispatch) => {
  // console.log('mk4');
  // console.log(dispatch);
  dispatch({ type: GET_IS_CREATING });
};

export const setIsCreating = boolCreating => (dispatch) => {
  dispatch({ type: SET_IS_CREATING, isCreating: boolCreating });
};
