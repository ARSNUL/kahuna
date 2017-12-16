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
		this.state = { authed: props.authed };
	}

	render() {
		return (
			<Route
				{...this.rest}
				render={() => (
					this.props.authed === true
						? <Component {...this.props} />
						: <Redirect to={{ pathname: '/login', state: { authed: this.state.authed } }} />
				)}
			/>
		);
	}
}

PrivateRoute.propTypes = {
	component: PropTypes.func,
	authed: PropTypes.bool,
};

function mapStateToProps(state) {
	return {
		isLoggedIn: state.loggedIn,
		redirectUrl: state.redirectUrl,
	};
}

export default withRouter(connect(mapStateToProps)(PrivateRoute));
