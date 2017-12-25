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
    return (
      <div>
        <p>redirecting...</p>
      </div>
    );
  }
}

Login.propTypes = {
  auth: PropTypes.shape({
    isFetching: PropTypes.bool,
    isAuthenticated: PropTypes.bool,
  }),
};

Login.defaultProps = {
  auth: {},
};

function mapStateToProps(state) {
  return {
    auth: state.auth.auth,
    redirectUrl: state.redirectUrl,
  };
}

export default withRouter(connect(mapStateToProps)(Login));
