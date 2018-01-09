import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { loginUser } from '../../actions/authentication';

class Login extends Component {
  componentWillMount() {
    this.props.loginUser();
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
  loginUser: PropTypes.func.isRequired,
};

Login.defaultProps = {
};

function mapStateToProps(state) {
  return {
    redirectUrl: state.redirectUrl,
  };
}

export default withRouter(connect(mapStateToProps, { loginUser })(Login));
