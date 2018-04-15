import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Users from './components/Users';
import Upload from './components/Upload';
import Login from './components/Login';
import LoginFailure from './components/LoginFailure';
import Logout from './components/Logout';
import Inventory from './components/Inventory';
import NotFound from './components/NotFound';
import Callback from './components/Callback';
import Auth from './components/Auth';
import PrivateRoute from './components/PrivateRoute';

export default () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/Login" exact component={Login} />
    <Route path="/Logout" exact component={Logout} />
    <Route path="/Callback" component={Callback} />
    <Route path="/Auth" component={Auth} />
    <Route path="/NotFound" component={NotFound} />
    <Route path="/LoginFailure" component={LoginFailure} />
    <PrivateRoute path="/Users" component={Users} />
    <PrivateRoute path="/Upload" component={Upload} />
    <PrivateRoute path="/Inventory" component={Inventory} />
  </Switch>
);
