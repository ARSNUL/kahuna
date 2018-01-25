export const GET_IS_LOADING = 'GET_IS_LOADING';
export const SET_IS_LOADING = 'SET_IS_LOADING';

export const getIsLoading = () => (dispatch) => {
  dispatch({ type: GET_IS_LOADING });
};

export const setIsLoading = boolLoading => (dispatch) => {
  dispatch({ type: SET_IS_LOADING, isLoading: boolLoading });
};
