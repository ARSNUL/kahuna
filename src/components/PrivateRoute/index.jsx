import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Link,
	Redirect,
	withRouter,
} from 'react-router-dom';

console.log('mk8');

const fakeAuth = {
	isAuthenticated: false,
	authenticate(cb) {
		this.isAuthenticated = true;
		setTimeout(cb, 100);
	},
	signout(cb) {
		this.isAuthenticated = false;
		setTimeout(cb, 100);
	},
};

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={(props) => (
		fakeAuth.isAuthenticated === true
			? <Component {...props} />
			: <Redirect to='/login' />
	)}/>
);

export default PrivateRoute;
