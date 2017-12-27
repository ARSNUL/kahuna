import React, { Component } from 'react';
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
};

Login.defaultProps = {
};

function mapStateToProps(state) {
  return {
    redirectUrl: state.redirectUrl,
  };
}

export default withRouter(connect(mapStateToProps)(Login));
