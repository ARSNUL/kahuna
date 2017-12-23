import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../actions';

class Login extends Component {
  componentWillMount() {
    loginUser();
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

Login.propTypes = {
  auth: PropTypes.shape({
    isFetching: PropTypes.bool,
    isAuthenticated: PropTypes.bool,
  }),
  errorMessage: PropTypes.string,
};

Login.defaultProps = {
  auth: {},
  errorMessage: null,
};

function mapStateToProps(state) {
  return {
    auth: state.auth.auth,
    redirectUrl: state.redirectUrl,
  };
}

export default withRouter(connect(mapStateToProps)(Login));
