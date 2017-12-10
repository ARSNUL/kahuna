import Auth0Lock from 'auth0-lock';

const full = `${location.protocol}//${location.hostname}${(location.port ? `:${location.port}` : '')}`;
const lock = new Auth0Lock('2If4KB0wScdHkxgVuxVI-LU82AS42FEE', '***REMOVED***rx.auth0.com', {
	auth: {
		redirectUrl: `${full}/callback`,
		responseType: 'code',
		params: {
			scope: 'openid name email picture',
		},
	},
});

lock.show();
