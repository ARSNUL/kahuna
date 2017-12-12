import React, { Component } from 'react';
import { Route } from 'react-router-dom';
// import Users from '../../components/Users';
// import './index.css';
// import '../../common/style.scss';


export default class Admin extends Component {
	render() {
		console.log('mk5');
		return (
			<div className="Admin">
				<div className="lander">
					<p>Admin</p>
					{/*<Users />*/}
				</div>
				{/*<Route path={`${match.url}/admin`} component={Admin} />*/}
			</div>
		);
	}
}
