export const GET_OBJECTS = 'GET_OBJECTS';
export const GET_OBJECT = 'GET_OBJECT';
export const SET_OBJECT = 'SET_OBJECT';
export const ADD_OBJECTS = 'ADD_OBJECTS';

export const addObjects = objects => (dispatch) => {
  const mapObjects = objects.map((objItem) => {
    const objObjectParams = {};
    Object.keys(objItem).forEach((key) => {
      switch (key) {
        case 'ContentLength':
          objObjectParams[key] = objItem[key].N;
          break;
        case 'ContentType':
          objObjectParams[key] = objItem[key].S;
          break;
        case 'sourceIPAddress':
          objObjectParams[key] = objItem[key].S;
          break;
        case 'key':
          objObjectParams[key] = objItem[key].S;
          break;
        case 'filename':
          objObjectParams[key] = objItem[key].S;
          break;
        case 'eventTime':
          objObjectParams[key] = new Date(parseInt(objItem[key].N, 10));
          break;
        case 'eventName':
          objObjectParams[key] = objItem[key].S;
          break;
        case 'bucket':
          objObjectParams[key] = objItem[key].S;
          break;
        case 'awsRegion':
          objObjectParams[key] = objItem[key].S;
          break;
        case 'LastModified':
          objObjectParams[key] = new Date(parseInt(objItem[key].N, 10));
          break;
        default:
          console.warn('unknown key');
      }
    });
    const obj = Object.create(null);
    obj[objItem.object_id] = objObjectParams;
    return obj;
  });
  localStorage.removeItem('objects');
  localStorage.setItem('objects', JSON.stringify(mapObjects));
  dispatch({ type: ADD_OBJECTS, auth0Objects: objects });
};

export const getAllObjects = () => (dispatch) => {
  dispatch({ type: GET_OBJECTS });
};

export const getObjectById = idObject => (dispatch) => {
  const objObjects = JSON.parse(localStorage.getItem('objects'));
  let objObject = {};
  objObjects.forEach((object) => {
    if (Object.keys(object)[0] === idObject) {
      const objObjectParams = { [idObject]: {} };
      Object.keys(object[idObject]).forEach((key) => {
        switch (key) {
          case 'created_at':
            objObjectParams[idObject][key] = new Date(object[idObject][key]);
            break;
          case 'updated_at':
            objObjectParams[idObject][key] = new Date(object[idObject][key]);
            break;
          case 'last_login':
            objObjectParams[idObject][key] = new Date(object[idObject][key]);
            break;
          default:
            objObjectParams[idObject][key] = object[idObject][key];
        }
      });
      objObject = objObjectParams;
      return dispatch({ type: SET_OBJECT, object });
    }
    return null;
  });
  return objObject;
};
