import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { handleAuthentication } from '../../actions/authentication';

class Callback extends Component {
  render() {
    // const { errorMessage } = this.props;
    this.props.handleAuthentication();
    return (
      <div />
      // <Redirect to="/Admin" />
    );
  }
}

Callback.propTypes = {
  handleAuthentication: PropTypes.func.isRequired,
  // errorMessage: PropTypes.string,
};

Callback.defaultProps = {
  // errorMessage: null,
};

function mapStateToProps(state) {
  return {
    redirectUrl: state.redirectUrl,
  };
}

export default withRouter(connect(mapStateToProps, { handleAuthentication })(Callback));
