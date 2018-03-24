import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AWS from 'aws-sdk';
import queryString from 'query-string';
import apigClientFactory from 'aws-api-gateway-client';
import { PropTypes } from 'prop-types';
import DLObjects from '../../components/DLObjects';
import './index.css';
import appConfig from '../../appConfig.json';
import LeftNav from '../../components/LeftNav';
import Loading from '../Loading';
import { setIsLoading } from '../../actions/loadingdata';

class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = { dlobjects: [] };
    this.state.qs = queryString.parse(this.props.location.search);
  }

  componentWillMount() {
    if (this.state.qs.id === undefined) {
      const token = localStorage.getItem('id_token');
      AWS.config.region = appConfig.cognito.region;
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: appConfig.cognito.poolId,
        RoleArn: appConfig.cognito.roleArn,
        Logins: {
          [appConfig.auth0.domain]: token,
        },
      });

      AWS.config.update({
        region: AWS.config.region,
        credentials: AWS.config.credentials,
      });

      const self = this;
      AWS.config.credentials.get(() => {
        const config = {
          invokeUrl: appConfig.api.baseUrl,
          accessKey: AWS.config.credentials.accessKeyId,
          secretKey: AWS.config.credentials.secretAccessKey,
          sessionToken: AWS.config.credentials.sessionToken,
          region: appConfig.cognito.region,
        };

        this.props.setIsLoading(true);
        const apigClient = apigClientFactory.newClient(config);
        apigClient.invokeApi({}, appConfig.apis.objects.uri, 'GET', {}, {})
          .then((response) => {
            console.log(response);
            this.props.setIsLoading(false);
            // this.props.addUsers(response.data);
            self.setState({ users: response.data });
          });
        // .catch((err) => {
        //   console.warn(err);
        // });
      });
    }
  }

  render() {
    // const { dlobjects } = this.state;
    return (
      <div className="Inventory">
        <Loading />
        <LeftNav />
        <div className="content">
          <div className="abdhr">
            <div className="abdhs">
              <h1>Data Lake Inventory</h1>
            </div>
          </div>
          <DLObjects objects={this.state.dlobjects} />
        </div>
      </div>
    );
  }
}

Inventory.propTypes = {
  setIsLoading: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
    hash: PropTypes.string,
    state: PropTypes.string,
  }),
};

Inventory.defaultProps = {
  location: {},
};

function mapStateToProps() {
  return {};
}

export default withRouter(connect(mapStateToProps, { setIsLoading })(Inventory));
