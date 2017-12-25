import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { handleAuthorization } from '../../actions';

class Callback extends Component {
  componentWillMount() {
    handleAuthorization(this.props.auth);
  }

  render() {
    const { errorMessage } = this.props;
    return (
      <div className="Callback">
        <div className="lander">
          <h1>Callback</h1>
          {errorMessage &&
          <p>{errorMessage}</p>
          }
        </div>
      </div>
    );
  }
}

Callback.propTypes = {
  auth: PropTypes.shape({
    isFetching: PropTypes.bool,
    isAuthenticated: PropTypes.bool,
  }),
  errorMessage: PropTypes.string,
};

Callback.defaultProps = {
  auth: {},
  errorMessage: null,
};

function mapStateToProps(state) {
  return {
    auth: state.auth.auth,
    redirectUrl: state.redirectUrl,
  };
}

export default withRouter(connect(mapStateToProps)(Callback));
