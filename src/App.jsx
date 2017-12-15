import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';
// import logo from './logo.svg';
import Routes from './Routes';
import './common/style.scss';
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="App container">
				<Navbar fluid collapseOnSelect>
					<Navbar.Header>
						<Navbar.Brand>
							<Link to="/">Home</Link>
							<Link to="/admin">Admin</Link>
							<Link to="/login">Login</Link>
						</Navbar.Brand>
					</Navbar.Header>
				</Navbar>
				<Routes />
			</div>
		);
	}
}

function mapStateToProps(state) {
	console.log(state);
	return {
		isLoggedIn: state.loggedIn,
		redirectUrl: state.redirectUrl,
	};
}

export default withRouter(connect(mapStateToProps)(App));
