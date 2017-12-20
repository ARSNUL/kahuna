import auth0 from 'auth0-js';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: '***REMOVED***rx.auth0.com',
    clientID: '2If4KB0wScdHkxgVuxVI-LU82AS42FEE',
    redirectUri: 'http://localhost:8080/callback',
    audience: 'https://***REMOVED***rx.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid',
  });

  login() {
    this.auth0.authorize();
  }

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        console.warn(err);
      }
    });
  }

  static setSession(authResult) {
    // Set the time that the access token will expire at
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    // const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    // localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('expires_at', authResult.idTokenPayload.exp);
    // navigate to the home route
  }

  static logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
  }

  static isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
