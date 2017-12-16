export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

function requestLogin(creds) {
	return {
		type: LOGIN_REQUEST,
		isFetching: true,
		isAuthenticated: false,
		creds,
	};
}

function receiveLogin(user) {
	return {
		type: LOGIN_SUCCESS,
		isFetching: false,
		isAuthenticated: true,
		id_token: user.id_token,
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

export function loginUser(creds) {
	console.log(creds);
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
					.then(user => ({ user, response })),
			)
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
				// TODO not sure if this is correct to do
				return Promise.resolve(user);
			})
			.catch(err => console.warn('Error: ', err));
	};
}
