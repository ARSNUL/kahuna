import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
// import { Route } from 'react-router-dom';
// import Users from '../../components/Users';
import './index.css';
import '../../common/style.scss';


class Admin extends Component {
	render() {
		return (
			<div className="Admin">
				<div className="lander">
					<p>Admin</p>
				</div>
			</div>
		);
	}
}

Admin.propTypes = {
	component: PropTypes.func,
};

export default Admin;
