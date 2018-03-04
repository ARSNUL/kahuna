export const GET_USERS = 'GET_USERS';
export const GET_USER = 'GET_USER';
export const SET_USER = 'SET_USER';
export const ADD_USERS = 'ADD_USERS';

export const addUsers = users => (dispatch) => {
  const mapUsers = users.map((item) => {
    const obj = Object.create(null);
    obj[item.user_id] = item;
    return obj;
  });
  localStorage.removeItem('users');
  localStorage.setItem('users', JSON.stringify(mapUsers));
  dispatch({ type: ADD_USERS, auth0Users: users });
};

export const getAllUsers = () => (dispatch) => {
  dispatch({ type: GET_USERS });
};

export const getUserById = idUser => (dispatch) => {
  const objUsers = JSON.parse(localStorage.getItem('users'));
  let objUser = {};
  objUsers.forEach((hello) => {
    if (Object.keys(hello)[0] === idUser) {
      objUser = hello;
      return dispatch({ type: SET_USER, user: hello });
    }
    return null;
  });
  return objUser;
};
