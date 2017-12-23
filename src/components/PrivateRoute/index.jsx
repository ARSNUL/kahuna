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
    console.log(this.props.auth);
    return (
      <Route
        {...this.rest}
        render={() => (
          this.props.auth.isAuthenticated === true
            ? <Route {...this.props} />
            : <Redirect to={{ pathname: '/login', state: { auth: this.props.auth } }} />
        )}
      />
    );
  }
}

PrivateRoute.propTypes = {
  auth: PropTypes.shape({
    isFetching: PropTypes.bool,
    isAuthenticated: PropTypes.bool,
  }),
  component: PropTypes.func,
};

PrivateRoute.defaultProps = {
  auth: {},
  component: null,
};

function mapStateToProps(state) {
  return {
    auth: state.auth.auth,
    redirectUrl: state.redirectUrl,
  };
}

export default withRouter(connect(mapStateToProps)(PrivateRoute));
