import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../actions';

class Login extends Component {
	constructor(props) {
		super(props);
		this.focusTextInput = this.focusTextInput.bind(this);
	}

	focusTextInput() {
		this.textInputU.focus();
		this.textInputP.focus();
	}

	handleClick() {
		const creds = { username: this.textInputU.value.trim(), password: this.textInputP.value.trim() };
		const something = loginUser(creds);
		console.warn(something);
	}

	render() {
		const { errorMessage } = this.props;
		return (
			<div>
				<form>
					<input type="text" ref={(input) => { this.textInputU = input; }} autoComplete="username" className="form-control" placeholder="Username" />
					<input type="password" ref={(input) => { this.textInputP = input; }} autoComplete="current-password" className="form-control" placeholder="Password" />
					<button onClick={event => this.handleClick(event)} className="btn btn-primary">
						Login
					</button>
				</form>

				{errorMessage &&
				<p>{errorMessage}</p>
				}
			</div>
		);
	}
}

Login.propTypes = {
	errorMessage: PropTypes.string,
};

function mapStateToProps(state) {
	return {
		isAuthenticated: state.auth.auth.isAuthenticated,
		redirectUrl: state.redirectUrl,
	};
}

export default withRouter(connect(mapStateToProps)(Login));
