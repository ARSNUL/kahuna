import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AWS from 'aws-sdk';
import queryString from 'query-string';
import { PropTypes } from 'prop-types';
import apigClientFactory from 'aws-api-gateway-client';
import Loading from '../Loading';
import Users from '../../components/Users';
import SubHeader from '../../components/SubHeader';
import FilterMenu from '../../components/FilterMenu';
import UserDetail from '../../components/UserDetail';
import './index.css';
import { addUsers, getAllUsers } from '../../actions/users';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [], loading: true };
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
            this.props.addUsers(response.data);
            console.log(response.data);
            let objState = { users: response.data, loading: false };
            self.setState(() => ({ loading: false }));
            self.setState(() => ({ users: response.data }));
            console.warn(this.state);
          })
          .catch((err) => {
            console.warn(err);
          });
      });
    }
  }

  render() {
    console.log('mk1');
    if (this.state.qs.id !== undefined) {
      return <UserDetail idUser={this.state.qs.id} />;
    }
    const { users } = this.state;
    return (
      <div className="Admin">
        <Loading loading={this.state.loading} />
        <SubHeader />
        <FilterMenu />
        <div className="lander">
          <Users users={users} />
        </div>
      </div>
    );
  }
}

Admin.propTypes = {
  addUsers: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
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

function mapStateToProps(state) {
  return {
  };
}

export default withRouter(connect(mapStateToProps, { addUsers, getAllUsers })(Admin));
