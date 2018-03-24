export const GET_USERS = 'GET_USERS';
export const GET_USER = 'GET_USER';
export const SET_USER = 'SET_USER';
export const ADD_USERS = 'ADD_USERS';

export const addUsers = users => (dispatch) => {
  const mapUsers = users.map((objItem) => {
    const objUserParams = {};
    Object.keys(objItem).forEach((key) => {
      switch (key) {
        case 'created_at':
          objUserParams[key] = new Date(objItem[key]);
          break;
        case 'updated_at':
          objUserParams[key] = new Date(objItem[key]);
          break;
        case 'last_login':
          objUserParams[key] = new Date(objItem[key]);
          break;
        default:
          objUserParams[key] = objItem[key];
      }
    });
    const obj = Object.create(null);
    obj[objItem.user_id] = objUserParams;
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
  objUsers.forEach((user) => {
    if (Object.keys(user)[0] === idUser) {
      const objUserParams = { [idUser]: {} };
      Object.keys(user[idUser]).forEach((key) => {
        switch (key) {
          case 'created_at':
            objUserParams[idUser][key] = new Date(user[idUser][key]);
            break;
          case 'updated_at':
            objUserParams[idUser][key] = new Date(user[idUser][key]);
            break;
          case 'last_login':
            objUserParams[idUser][key] = new Date(user[idUser][key]);
            break;
          default:
            objUserParams[idUser][key] = user[idUser][key];
        }
      });
      objUser = objUserParams;
      return dispatch({ type: SET_USER, user });
    }
    return null;
  });
  return objUser;
};
