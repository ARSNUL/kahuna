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
    return (
      <Route
        {...this.rest}
        render={() => (
          this.props.authentication.isAuthenticated === true
            ? <Route {...this.props} />
            : <Redirect to={{ pathname: '/login', state: { authentication: this.props.authentication } }} />
        )}
      />
    );
  }
}

PrivateRoute.propTypes = {
  authentication: PropTypes.shape({
    isFetching: PropTypes.bool,
    isAuthenticated: PropTypes.bool,
  }),
  component: PropTypes.func,
};

PrivateRoute.defaultProps = {
  authentication: {},
  component: null,
};

function mapStateToProps(state) {
  return {
    authentication: state.authentication.authentication,
    redirectUrl: state.redirectUrl,
  };
}

export default withRouter(connect(mapStateToProps)(PrivateRoute));
