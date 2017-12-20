import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import Admin from './containers/Admin';
import Upload from './containers/Upload';
import Login from './containers/LoginAuth0';
import LoginFailure from './containers/LoginFailure';
import Logout from './containers/Logout';
import Inventory from './containers/Inventory';
import NotFound from './containers/NotFound';
import Callback from './containers/Callback';
import Auth from './containers/Auth';
import PrivateRoute from './components/PrivateRoute';

export default () =>
	(
		<Switch>
			<Route path="/" exact component={Home} />
			<Route path="/login" exact component={Login} />
			<Route path="/logout" exact component={Logout} />
			<Route path="/callback" component={Callback} />
			<Route path="/auth" component={Auth} />
			<Route path="/notfound" component={NotFound} />
			<Route path="/loginfailure" component={LoginFailure} />
			<PrivateRoute path="/admin" component={Admin} />
			<PrivateRoute path="/upload" component={Upload} />
			<PrivateRoute path="/inventory" component={Inventory} />
		</Switch>
	);
