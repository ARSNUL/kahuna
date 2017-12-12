import React, { Component } from 'react';
import './index.css';
import FakeAuth from '../../components/FakeAuth';
// import '../../utils/login';

export default class Login extends Component {
	constructor() {
		super();
		// console.log(this);
	}

	render() {
		return (
			<div className="Login">
				<div className="lander">
					<h1>Login</h1>
					<button onClick={FakeAuth.authenticate}>Authenticate</button>
				</div>
			</div>

		);
	}
}
