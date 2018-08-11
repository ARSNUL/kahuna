import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AWS from 'aws-sdk';
import queryString from 'query-string';
import apigClientFactory from 'aws-api-gateway-client';
import { PropTypes } from 'prop-types';
import DLObjects from '../DLObjects';
import './index.css';
import appConfig from '../../appConfig.json';
import LeftNav from '../LeftNav';
import Loading from '../Loading';
import { setIsLoading } from '../../actions/loadingdata';
import { addObjects } from '../../actions/objects';
// import NewUserModal from '../NewUserModal';
// import UsersList from '../UsersList';

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
            const arrObjectParams = [];
            response.data.Items.forEach((objItem) => {
              const objObjectParams = {};
              Object.keys(objItem).forEach((key) => {
                switch (key) {
                  case 'ContentLength':
                    objObjectParams[key] = parseInt(objItem[key].N);
                    break;
                  case 'ContentType':
                    objObjectParams[key] = objItem[key].S;
                    break;
                  case 'sourceIPAddress':
                    objObjectParams[key] = objItem[key].S;
                    break;
                  case 'key':
                    objObjectParams[key] = objItem[key].S;
                    break;
                  case 'filename':
                    objObjectParams[key] = objItem[key].S;
                    break;
                  case 'eventTime':
                    objObjectParams[key] = new Date(parseInt(objItem[key].N, 10));
                    break;
                  case 'eventName':
                    objObjectParams[key] = objItem[key].S;
                    break;
                  case 'bucket':
                    objObjectParams[key] = objItem[key].S;
                    break;
                  case 'awsRegion':
                    objObjectParams[key] = objItem[key].S;
                    break;
                  case 'LastModified':
                    objObjectParams[key] = new Date(parseInt(objItem[key].N, 10));
                    break;
                  default:
                    console.warn('unknown key');
                }
              });
              arrObjectParams.push(objObjectParams);
            });
            this.props.setIsLoading(false);
            this.props.addObjects(arrObjectParams);
            self.setState({ dlobjects: arrObjectParams });
          })
          .catch((err) => {
            console.warn(err);
          });
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
              <h1>
                Data Lake Inventory
              </h1>
            </div>
          </div>
          <DLObjects dlobjects={this.state.dlobjects} />
        </div>
      </div>
    );
  }
}

Inventory.propTypes = {
  addObjects: PropTypes.func.isRequired,
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

export default withRouter(connect(mapStateToProps, { addObjects, setIsLoading })(Inventory));
