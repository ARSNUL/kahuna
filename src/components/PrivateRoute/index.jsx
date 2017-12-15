import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
	Route,
	Redirect,
} from 'react-router-dom';

class PrivateRoute extends Component {
	constructor(props) {
		super(props);
		console.log(props);
		// console.log(props.state);
		this.state = { authed: props.authed };
	}

	render() {
		// console.log('this.state.authed: ' + this.state.authed);
		return (
			<Route
				{...this.rest}
				render={props =>
					this.props.authed === true
						? <Component {...this.props} />
						: <Redirect to={{ pathname: '/login', state: { authed: this.state.authed } }} />
				}
			/>
		);
	}
}

PrivateRoute.propTypes = {
	component: PropTypes.func,
};

export default PrivateRoute;
