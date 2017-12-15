import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

export default class Login extends Component {
	handleClick(event) {
		console.log(event);
		const username = this.props.username;
		const password = this.props.password;
		const creds = { username: username.value.trim(), password: password.value.trim() };
		this.props.onLoginClick(creds);
	}

	render() {
		const { errorMessage } = this.props;
		return (
			<div>
				<input type="text" className="form-control" placeholder="Username" />
				<input type="password" className="form-control" placeholder="Password" />
				<button onClick={event => this.handleClick(event)} className="btn btn-primary">
					Login
				</button>

				{errorMessage &&
				<p>{errorMessage}</p>
				}
			</div>
		);
	}
}

Login.propTypes = {
	onLoginClick: PropTypes.func.isRequired,
	errorMessage: PropTypes.string,
	username: PropTypes.string,
	password: PropTypes.string,
};
