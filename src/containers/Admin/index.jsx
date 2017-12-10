import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Users from '../../components/Users';
import './index.css';
import '../../common/style.scss';

const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();

export default class Admin extends Component {
	render(match) {
		console.log(ensureLoggedIn);
		return (
			<div className="Admin">
				<div className="lander">
					<p>Admin</p>
					<Users />
				</div>
				<Route path={`${match.url}/admin`} component={Admin} />
			</div>
		);
	}
}
