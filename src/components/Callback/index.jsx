import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { handleAuthentication } from '../../actions/authentication';
import LeftNav from '../LeftNav';

class Callback extends Component {
  componentWillMount() {
    this.props.handleAuthentication();
  }

  render() {
    const { errorMessage } = this.props;
    return (
      <div className="Callback">
        <LeftNav />
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
  handleAuthentication: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

Callback.defaultProps = {
  errorMessage: null,
};

function mapStateToProps(state) {
  return {
    redirectUrl: state.redirectUrl,
  };
}

export default withRouter(connect(mapStateToProps, { handleAuthentication })(Callback));
