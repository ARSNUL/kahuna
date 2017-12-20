import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Auth0Lock from 'auth0-lock';
import { loginAuth0User } from '../../actions';

class LoginAuth0 extends Component {
  componentWillMount() {
    const dispatch = loginAuth0User;
    if (this.props.auth.isAuthenticated !== true) {
      const lock = new Auth0Lock('2If4KB0wScdHkxgVuxVI-LU82AS42FEE', '***REMOVED***rx.auth0.com');
      lock.show();
      lock.on('authenticated', (authResult) => {
        console.log(authResult);
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', authResult.idTokenPayload.exp);
        dispatch(loginAuth0User(authResult));
        // lock.getUserInfo(authResult.accessToken, (error, profile) => {
        // if (error) {
        //   return false;
        // }
        // });
      });
    } else {
      console.warn('ALREADY AUTHENTICATED');
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
  auth: PropTypes.shape({
    isFetching: PropTypes.bool,
    isAuthenticated: PropTypes.bool,
  }),
  errorMessage: PropTypes.string,
};

LoginAuth0.defaultProps = {
  auth: {},
  errorMessage: null,
};

function mapStateToProps(state) {
  return {
    auth: state.auth.auth,
    redirectUrl: state.redirectUrl,
  };
}

export default withRouter(connect(mapStateToProps)(LoginAuth0));
