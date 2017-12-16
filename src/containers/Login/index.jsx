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
		const creds = { username: this.textInputU.value.trim(), password: this.textInputP.value.trim() };
		loginUser(creds);
	}

	render() {
		const { errorMessage } = this.props;
		return (
			<div>
				<form>
					<input type="text" ref={(input) => { this.textInputU = input; }} autoComplete="username" className="form-control" placeholder="Username" />
					<input type="password" ref={(input) => { this.textInputP = input; }} autoComplete="current-password" className="form-control" placeholder="Password" />
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
