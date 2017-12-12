import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	BrowserRouter as Router,
	Route,
	Link,
	Redirect,
	withRouter,
} from 'react-router-dom';
// import fakeAuth from '../fakeAuth';

export default class PrivateRoute extends Component {
	constructor() {
		super();
	}

	render() {
		console.log(...this.props.component);
		if (!this.props.component.isAuthenticated) {
			return(
				<Redirect to="/login" />
			)
		}
		// const something = fakeAuth.isAuthenticated === true
		// 	? <Component {...this.props} />
		// 	: <Redirect to="/login" />;
		console.log('mk11');
		// console.log(something);
		return(
			<Route {...this.props} />
		)
		// return(
		// 	{ ...props.component.isAuthenticated === true
		// 		? <Component {...this.props} />
		// 		: <Redirect to="/login"/>
		// 	});
			// <Route {...this.props} />
		// );
	}
}

PrivateRoute.propTypes = {
	// component: PropTypes.element,
};

// const PrivateRoute = ({ component: Component, ...rest }) => (
	{/*<Route {...rest} render={props => (*/}
		// fakeAuth.isAuthenticated === true
		// 	? <Component {...props} />
		// 	: <Redirect to="/login" />
	// )} />
// );

// export default PrivateRoute;
