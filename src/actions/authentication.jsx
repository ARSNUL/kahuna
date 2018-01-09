import auth0 from 'auth0-js';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const handleAuthentication = () => (dispatch) => {
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
      dispatch({ type: LOGIN_SUCCESS });
    } else if (err) {
      console.warn(err);
    }
  });
};

export const loginUser = () => (dispatch) => {
  new auth0.WebAuth({
    domain: '***REMOVED***rx.auth0.com',
    clientID: '0IiT2J2k96uMLgoFuq991mxCYOPytITk',
    redirectUri: `${window.location.protocol}//${window.location.host}/callback`,
    audience: 'https://***REMOVED***rx.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid',
  })
    .authorize();
  dispatch({ type: LOGIN_REQUEST });
};
