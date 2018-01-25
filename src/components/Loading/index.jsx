import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import './index.css';
import { getIsLoading } from '../../actions/loadingdata';

class Loading extends Component {
  render() {
    let strVisibility = 'hidden';
    if (this.props.isLoading === true) {
      strVisibility = 'visible';
    }
    return (
      <div
        className="Loading"
        style={{ visibility: strVisibility }}
      >
        <h1>Loading...</h1>
      </div>
    );
  }
}

Loading.propTypes = {
  isLoading: PropTypes.bool,
};

Loading.defaultProps = {
  isLoading: false,
};

function mapStateToProps(state) {
  return {
    isLoading: state.loadingdata.loadingdata.isLoading,
  };
}

export default withRouter(connect(mapStateToProps, { getIsLoading })(Loading));
