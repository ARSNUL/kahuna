import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import { loginUser } from '../../actions';
import Auth0Lock from 'auth0-lock';

class LoginAuth0 extends Component {
	componentWillMount() {
		if (this.props.isAuthenticated !== true) {
			this.lock = new Auth0Lock('2If4KB0wScdHkxgVuxVI-LU82AS42FEE', '***REMOVED***rx.auth0.com');
			this.lock.show();
		}
	}

	render() {
		const { errorMessage } = this.props;
		return (
			<div>
				<p>Hi there</p>
				{errorMessage &&
				<p>{errorMessage}</p>
				}
			</div>
		);
	}
}

LoginAuth0.propTypes = {
	isAuthenticated: PropTypes.bool,
	errorMessage: PropTypes.string,
};

function mapStateToProps(state) {
	return {
		isAuthenticated: state.auth.auth.isAuthenticated,
		redirectUrl: state.redirectUrl,
	};
}

export default withRouter(connect(mapStateToProps)(LoginAuth0));
