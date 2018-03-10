import React, { Component } from 'react';
// import { PropTypes } from 'prop-types';
import 'react-fine-uploader/gallery/gallery.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FineUploaderS3 from 'fine-uploader-wrappers/s3';
import Gallery from 'react-fine-uploader';
import './index.css';
import LeftNav from '../../components/LeftNav';
import { addUsers } from '../../actions/users';
import { setIsLoading } from '../../actions/loadingdata';

const uploader = new FineUploaderS3({
  options: {
    request: {
      endpoint: 'https://588439395328-kahuna-lake-v1.s3-us-west-2.amazonaws.com',
      accessKey: 'AKIAIZC55BRNE7NHOIFA',
      params: {
        loggedinuser: '',
      },
    },
    signature: {
      endpoint: 'https://kahuna.arsnul.com/upload',
    },
    objectProperties: {
      serverSideEncryption: true,
    },
    chunking: {
      enabled: true,
    },
    validation: {
      itemLimit: 50,
      sizeLimit: 2000000000,
    },
  },
});

class Upload extends Component {
  render() {
    return (
      <div className="Upload">
        <LeftNav />
        <Gallery uploader={uploader} />
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
