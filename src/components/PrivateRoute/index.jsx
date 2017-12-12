import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
	Route,
	Redirect,
} from 'react-router-dom';

export default class PrivateRoute extends Component {
	render() {
		// console.log(this.props.authed);
		console.log(this.props.history);
		// history.push('/admin');
		this.props.history.push('/admin');
		return (
			<Route
				{...this.rest}
				render={props =>
					this.props.authed === true
						? <Component {...this.props} />
						: <Redirect to={{ pathname: '/login', state: { from: this.props.location } }} />
				} />
		);
	}
}

PrivateRoute.propTypes = {
	component: PropTypes.func,
};
