import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AWS from 'aws-sdk';
import queryString from 'query-string';
import { PropTypes } from 'prop-types';
import apigClientFactory from 'aws-api-gateway-client';
import Loading from '../Loading';
import Users from '../../components/Users';
import LeftNav from '../../components/LeftNav';
import UserDetail from '../../components/UserDetail';
import './index.css';
import { addUsers } from '../../actions/users';
import { setIsLoading } from '../../actions/loadingdata';
import appConfig from '../../config.json';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
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
          invokeUrl: appConfig.api.url,
          accessKey: AWS.config.credentials.accessKeyId,
          secretKey: AWS.config.credentials.secretAccessKey,
          sessionToken: AWS.config.credentials.sessionToken,
          region: appConfig.cognito.region,
        };

        this.props.setIsLoading(true);
        const apigClient = apigClientFactory.newClient(config);
        apigClient.invokeApi({}, appConfig.api.uris.users, 'GET', {}, {})
          .then((response) => {
            this.props.setIsLoading(false);
            this.props.addUsers(response.data);
            console.log(response.data);
            self.setState(() => ({ users: response.data }));
          })
          .catch((err) => {
            console.warn(err);
          });
      });
    }
  }

  render() {
    if (this.state.qs.id !== undefined) {
      return <UserDetail idUser={this.state.qs.id} />;
    }
    return (
      <div className="Admin">
        <Loading />
        <LeftNav />
        <div className="content">
          <div>
            <div className="abdhs">
              <h3>Users</h3>
            </div>
            <div className="abdhs">
              <button>Create New User</button>
            </div>
          </div>
          <Users users={this.state.users} />
        </div>
      </div>
    );
  }
}

Admin.propTypes = {
  addUsers: PropTypes.func.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
    hash: PropTypes.string,
    state: PropTypes.string,
  }),
};

Admin.defaultProps = {
  location: {},
};

function mapStateToProps() {
  return {};
}

export default withRouter(connect(mapStateToProps, { addUsers, setIsLoading })(Admin));
