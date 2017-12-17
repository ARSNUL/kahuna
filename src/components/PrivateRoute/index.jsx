import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import {
	Route,
	Redirect,
	withRouter,
} from 'react-router-dom';

class PrivateRoute extends Component {
	constructor(props) {
		super(props);
		this.state = { isAuthenticated: props.auth.isAuthenticated };
	}

	render() {
		console.log(...this.props.component);
		return (
			<Route
				{...this.rest}
				render={() => (
					this.props.auth.isAuthenticated === true
						? <Route {...this.props} />
						: <Redirect to={{ pathname: '/login', state: { auth: this.state.auth } }} />
				)}
			/>
		);
	}
}

PrivateRoute.propTypes = {
	auth: PropTypes.shape({
		isFetching: PropTypes.bool,
		isAuthenticated: PropTypes.bool,
	}),
	component: PropTypes.func,
};

function mapStateToProps(state) {
	return {
		auth: state.auth.auth,
		redirectUrl: state.redirectUrl,
	};
}

export default withRouter(connect(mapStateToProps)(PrivateRoute));
