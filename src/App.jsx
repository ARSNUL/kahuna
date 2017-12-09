import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
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
							<Link to="/inventory">Inventory</Link>
							<Link to="/upload">Upload</Link>
							<Link to="/login">Login</Link>
						</Navbar.Brand>
						<Navbar.Toggle />
					</Navbar.Header>
				</Navbar>
				<Routes />
			</div>
		);
	}
}

export default App;
