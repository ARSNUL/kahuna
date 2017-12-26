import auth0 from 'auth0-js';
import AWS from 'aws-sdk';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

function requestLogin(authResult) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    authResult,
  };
}

function receiveLogin(authResult) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: authResult.idToken,
  };
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message,
  };
}

function implementCognito() {
  AWS.config.region = 'us-west-2';
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-west-2:2440ab57-1a73-4701-91a1-0bfbf60a58a2',
    Logins: {
      '***REMOVED***rx.auth0.com': localStorage.getItem('id_token'),
    },
  });
}

export function handleAuthorization(auth) {
  const webAuth = new auth0.WebAuth({
    domain: '***REMOVED***rx.auth0.com',
    clientID: '0IiT2J2k96uMLgoFuq991mxCYOPytITk',
    redirectUri: `${window.location.protocol}//${window.location.host}/callback`,
    audience: 'https://***REMOVED***rx.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid',
  });
  webAuth.parseHash((err, authResult) => {
    if (authResult && authResult.accessToken && authResult.idToken) {
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('expires_at', authResult.idTokenPayload.exp);
      auth.isAuthenticated = true;
      implementCognito();
    } else if (err) {
      console.warn(err);
    }
  });
}

export function loginUser() {
  const webAuth = new auth0.WebAuth({
    domain: '***REMOVED***rx.auth0.com',
    clientID: '0IiT2J2k96uMLgoFuq991mxCYOPytITk',
    redirectUri: `${window.location.protocol}//${window.location.host}/callback`,
    audience: 'https://***REMOVED***rx.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid',
  });
  webAuth.authorize();
}

export function loginUserOLD(creds) {
  const config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `username=${creds.username}&password=${creds.password}`,
  };

  return (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds));
    return fetch('http://localhost:8080/sessions/create', config)
      .then(response =>
        response.json()
          .then(user => ({ user, response })))
      .then(({ user, response }) => {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(loginError(user.message));
          return Promise.reject(user);
        }
        // If login was successful, set the token in local storage
        localStorage.setItem('id_token', user.id_token);
        localStorage.setItem('id_token', user.access_token);
        // Dispatch the success action
        dispatch(receiveLogin(user));
        return Promise.resolve(user);
      })
      .catch(err => console.warn('Error: ', err));
  };
}
