import React, { Component } from 'react';
import Users from '../../components/Users';
import './index.css';
import '../../common/style.scss';

export default class Admin extends Component {
	render() {
		return (
			<div className="Admin">
				<div className="lander">
					<p>Admin</p>
					<Users />
				</div>
			</div>
		);
	}
}
