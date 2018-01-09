import React, { Component } from 'react';
import AWS from 'aws-sdk';
import queryString from 'query-string';
import { PropTypes } from 'prop-types';
import apigClientFactory from 'aws-api-gateway-client';
import Users from '../../components/Users';
import SubHeader from '../../components/SubHeader';
import UserDetail from '../../components/UserDetail';
import './index.css';
import User from '../../components/User';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
    this.state.qs = queryString.parse(this.props.location.search);
  }

  componentWillMount() {
    if (this.state.qs.id === undefined) {
      const userPool = 'us-west-2:2440ab57-1a73-4701-91a1-0bfbf60a58a2';
      const token = localStorage.getItem('id_token');
      AWS.config.region = 'us-west-2';
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: userPool,
        Logins: {
          '***REMOVED***rx.auth0.com': token,
        },
      });

      const self = this;
      AWS.config.credentials.get(() => {
        const config = {
          invokeUrl: 'https://api.***REMOVED***rx.io',
          accessKey: AWS.config.credentials.accessKeyId,
          secretKey: AWS.config.credentials.secretAccessKey,
          sessionToken: AWS.config.credentials.sessionToken,
          region: 'us-west-2',
        };

        const apigClient = apigClientFactory.newClient(config);

        apigClient.invokeApi({}, '/cut/users', 'GET', {}, {})
          .then((response) => {
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
      console.log(this.props);
      return <UserDetail params={this.props.params} />;
    }
    const { users } = this.state;
    const clsUF = 'leftpane';
    return (
      <div className="Admin">
        <SubHeader />
        <div className={clsUF}>
          <div>
            <div>
              <div>
                <div>
                  <div>Filters</div>
                  <div>
                    <div>
                      <div>By User Type</div>
                      <div>
                        <input type="text" aria-hidden="true" />
                        <div>Active Users</div>
                        <div>Disabled Users</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lander">
          <Users users={users} />
        </div>
      </div>
    );
  }
}

Admin.propTypes = {
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

export default Admin;
