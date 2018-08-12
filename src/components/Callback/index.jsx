import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { handleAuthenticationResult } from '../../actions/authentication';

class Callback extends Component {
  constructor(props) {
    super(props);
    this.state = { amAuthenticated: false };
  }

  render() {
    const some = handleAuthenticationResult(this);
    some(this);
    const { amAuthenticated } = this.state;
    if (amAuthenticated === true) {
      return <Redirect to="/Upload" />;
    }
    return (
      <div>
        Callback...
      </div>
    );
  }
}

Callback.propTypes = {
  // handleAuthenticationResult: PropTypes.func.isRequired,
  // errorMessage: PropTypes.string,
};

Callback.defaultProps = {
  // errorMessage: null,
};

function mapStateToProps(state) {
  return {
    authentication: state.authentication.authentication,
    redirectUrl: state.redirectUrl,
  };
}

export default withRouter(connect(mapStateToProps, { handleAuthenticationResult })(Callback));
