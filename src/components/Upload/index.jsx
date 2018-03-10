import React, { Component } from 'react';
// import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './index.css';
import LeftNav from '../../components/LeftNav';
import { addUsers } from '../../actions/users';
import { setIsLoading } from '../../actions/loadingdata';

class Upload extends Component {
  render() {
    return (
      <div className="Upload">
        <LeftNav />
        <div className="content">
          <h1>Upload</h1>
        </div>
      </div>
    );
  }
}

Upload.propTypes = {
  // addUsers: PropTypes.func.isRequired,
  // setIsLoading: PropTypes.func.isRequired,
  // location: PropTypes.shape({
  //   pathname: PropTypes.string,
  //   search: PropTypes.string,
  //   hash: PropTypes.string,
  //   state: PropTypes.string,
  // }),
};

Upload.defaultProps = {
  // location: {},
};

function mapStateToProps() {
  return {};
}

export default withRouter(connect(mapStateToProps, { addUsers, setIsLoading })(Upload));
