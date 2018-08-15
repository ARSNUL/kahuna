import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import './index.css';
import { getIsLoading } from '../../actions/loadingdata';

function Loading(props) {
  const { isLoading } = props;
  let strVisibility = 'hidden';
  if (isLoading === true) {
    strVisibility = 'visible';
  }
  return (
    <div
      className="Loading"
      style={{ visibility: strVisibility }}
    >
      <h3>Loading...</h3>
    </div>
  );
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
