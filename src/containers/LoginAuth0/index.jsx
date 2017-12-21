import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginAuth0User } from '../../actions';

class LoginAuth0 extends Component {
  componentWillMount() {
    const dispatch = loginAuth0User;
    if (this.props.auth.isAuthenticated !== true) {
      const something = dispatch();
      console.log(something);
      something();
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
