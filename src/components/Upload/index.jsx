import React from 'react';
// import { PropTypes } from 'prop-types';
import 'react-fine-uploader/gallery/gallery.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FineUploaderS3 from 'fine-uploader-wrappers/s3';
import Gallery from 'react-fine-uploader/gallery';
import './index.css';
import './fine-uploader.css';
import LeftNav from '../LeftNav';
import { addUsers } from '../../actions/users';
import { setIsLoading } from '../../actions/loadingdata';
import appConfig from '../../appConfig.json';

const uploader = new FineUploaderS3({
  options: {
    request: {
      endpoint: appConfig.datalake.uploadEndpoint,
      accessKey: appConfig.datalake.accessKey,
      params: {
        loggedinuser: '',
      },
    },
    signature: {
      endpoint: appConfig.datalake.signatureEndpoint,
    },
    objectProperties: {
      serverSideEncryption: appConfig.datalake.serverSideEncryption,
    },
    chunking: {
      enabled: appConfig.datalake.chunking,
    },
    validation: {
      itemLimit: appConfig.datalake.validation.itemLimit,
      sizeLimit: appConfig.datalake.validation.sizeLimit,
    },
  },
});

function Upload() {
  return (
    <div className="Upload">
      <LeftNav />
      <Gallery uploader={uploader} />
    </div>
  );
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
