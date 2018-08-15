import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import {
  Route,
  Redirect,
  withRouter,
} from 'react-router-dom';

class PrivateRoute extends Component {
  render() {
    const { authenticationState } = this.props;
    return (
      <Route
        {...this.rest}
        render={() => (
          authenticationState.isAuthenticated === true
            ? <Route {...this.props} />
            : <Redirect to={{ pathname: '/login' }} />
        )}
      />
    );
  }
}

PrivateRoute.propTypes = {
  authenticationState: PropTypes.shape({
    isFetching: PropTypes.bool,
    isAuthenticated: PropTypes.bool,
  }),
  component: PropTypes.func,
};

PrivateRoute.defaultProps = {
  authenticationState: {},
  component: null,
};

function mapStateToProps(state) {
  // const { authentication, redirectUrl } = state;
  // return { authentication, redirectUrl };
  // return {};
  const { authenticationState } = state.authentication;
  const { redirectUrl } = state;
  return {
    authenticationState,
    redirectUrl,
  };
}

const connectedState = connect(mapStateToProps);
const connectedStateWithPrivateRoute = connectedState(PrivateRoute);
export default withRouter(connectedStateWithPrivateRoute);
