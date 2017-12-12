import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import './index.css';
// import '../../utils/login';

export default class Login extends Component {
	constructor() {
		super();
		this.authenticate = this.authenticate.bind(this);
	}

	authenticate(c) {
		this.props.location.state.authed = true;
		return (
			this.props.history.goBack()
		);
	}

	render() {
		console.log(this);
		return (
			<div className="Login">
				<div className="lander">
					<h1>Login</h1>
					<button onClick={this.authenticate}>Authenticate</button>
				</div>
			</div>

		);
	}
}

Login.propTypes = {
	component: PropTypes.func,
};
