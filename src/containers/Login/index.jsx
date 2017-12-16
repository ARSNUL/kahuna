import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { loginUser } from '../../actions';

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.focusTextInput = this.focusTextInput.bind(this);
	}

	focusTextInput() {
		console.log('something');
		this.textInput.focus();
	}

	handleClick() {
		const username = this.textInput.username;
		const password = this.textInput.password;
		const creds = { username: username.value.trim(), password: password.value.trim() };
		loginUser(creds);
	}

	render() {
		const { errorMessage } = this.props;
		const refUsername = 'username';
		const refPassword = 'password';
		return (
			<div>
				<form>
					<input type="text" ref={refUsername} className="form-control" placeholder="Username" />
					<input type="password" ref={refPassword} className="form-control" placeholder="Password" />
					<button onClick={event => this.handleClick(event)} className="btn btn-primary">
						Login
					</button>
				</form>

				{errorMessage &&
				<p>{errorMessage}</p>
				}
			</div>
		);
	}
}

Login.propTypes = {
	errorMessage: PropTypes.string,
};
