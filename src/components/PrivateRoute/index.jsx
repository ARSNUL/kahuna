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
		this.state = { isAuthenticated: props.isAuthenticated };
	}

	render() {
		return (
			<Route
				{...this.rest}
				render={() => (
					this.props.isAuthenticated === true
						? <Component {...this.props} />
						: <Redirect to={{ pathname: '/login', state: { isAuthenticated: this.state.isAuthenticated } }} />
				)}
			/>
		);
	}
}

PrivateRoute.propTypes = {
	component: PropTypes.func,
	isAuthenticated: PropTypes.bool,
};

function mapStateToProps(state) {
	return {
		isAuthenticated: state.auth.auth.isAuthenticated,
		redirectUrl: state.redirectUrl,
	};
}

export default withRouter(connect(mapStateToProps)(PrivateRoute));
