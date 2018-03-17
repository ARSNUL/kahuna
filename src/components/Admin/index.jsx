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
import NewUserModal from '../../components/NewUserModal';
import './index.css';
import { addUsers } from '../../actions/users';
import { setIsLoading } from '../../actions/loadingdata';
import appConfig from '../../appConfig.json';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
    this.state.qs = queryString.parse(this.props.location.search);
    this.state.newUserModalActive = false;
    this.handleClick = this.handleClick.bind(this);
    this.escFunction = this.escFunction.bind(this);
  }

  componentWillMount() {
    // return;
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
        apigClient.invokeApi({}, appConfig.apis.users.uri, 'GET', {}, {})
          .then((response) => {
            this.props.setIsLoading(false);
            this.props.addUsers(response.data);
            self.setState(() => ({ users: response.data }));
          });
        // .catch((err) => {
        //   console.warn(err);
        // });
      });
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.escFunction, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction, false);
  }

  hideModal = () => {
    console.log('mk2');
    this.setState({
      newUserModalActive: false,
    });
    console.log(this.state);
  };

  escFunction(event) {
    if (event.keyCode === 27) {
      this.hideModal();
    }
  }

  handleClick() {
    this.setState({ newUserModalActive: true });
  }

  render() {
    if (this.state.qs.id !== undefined) {
      return <UserDetail idUser={this.state.qs.id} />;
    }

    return (
      <div className="Admin">
        <Loading />
        <LeftNav />
        <NewUserModal active={this.state.newUserModalActive} />
        <div className="content">
          <div className="abdhr">
            <div className="abdhs">
              <h1>Users</h1>
            </div>
            <div className="abdht">
              <button onClick={e => this.handleClick(e)}>+ New User</button>
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
