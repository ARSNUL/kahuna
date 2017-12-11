import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';
// import logo from './logo.svg';
import Routes from './Routes';
import './common/style.scss';
import './App.css';

class App extends Component {
	componentDidUpdate(prevProps) {
		console.log('mk4');
		const { dispatch, redirectUrl } = this.props;
		// const isLoggingOut = prevProps.isLoggedIn && !this.props.isLoggedIn;
		const isLoggingIn = !prevProps.isLoggedIn && this.props.isLoggedIn;
		console.log(this.props);
		if (isLoggingIn) {
			console.log('mk1');
			dispatch(navigateTo(redirectUrl));
		// } else if (isLoggingOut) {
			// do any kind of cleanup or post-logout redirection here
		}
	}

	render() {
		console.log('mk1');
		return (
			<div className="App container">
				<Navbar fluid collapseOnSelect>
					<Navbar.Header>
						<Navbar.Brand>
							<Link to="/">Home</Link>
							<Link to="/admin">Admin</Link>
							<Link to="/inventory">Inventory</Link>
							<Link to="/upload">Upload</Link>
							<Link to="/login">Login</Link>
						</Navbar.Brand>
					</Navbar.Header>
				</Navbar>
				<Routes />
			</div>
		// return this.props.children
		);
	}
}

function mapStateToProps(state) {
	console.log('mk2');
	return {
		isLoggedIn: state.loggedIn,
		redirectUrl: state.redirectUrl,
	};
}

console.log('mk3');
// export default App;
export default connect(mapStateToProps)(App);
