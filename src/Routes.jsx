import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './containers/Home';
import Admin from './containers/Admin';
import Upload from './containers/Upload';
import Login from './containers/Login';
import LoginFailure from './containers/LoginFailure';
import Logout from './containers/Logout';
import Inventory from './containers/Inventory';
import NotFound from './containers/NotFound';
import Callback from './containers/Callback';
import PrivateRoute from './components/PrivateRoute';
import FakeAuth from './components/FakeAuth';

export default () =>
	(<Switch>
		<Route path="/" exact component={Home} />
		<Route path="/inventory" exact component={Inventory} />
		<Route path="/upload" exact component={Upload} />
		<Route path="/login" exact component={Login} />
		<Route path="/login-failure" exact component={LoginFailure} />
		<Route path="/logout" exact component={Logout} />
		<Route path="/notfound" exact component={NotFound} />
		<Route path="/callback" component={Callback} />
		<PrivateRoute path="/admin" component={Admin} helper={FakeAuth} />
	</Switch>);
