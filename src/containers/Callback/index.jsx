import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Callback extends Component {
  render() {
    return (
      <div className="Callback">
        <div className="lander">
          <h1>Callback</h1>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.auth.isAuthenticated,
    redirectUrl: state.redirectUrl,
  };
}

export default withRouter(connect(mapStateToProps)(Callback));
