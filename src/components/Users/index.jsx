import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AWS from 'aws-sdk';
import queryString from 'query-string';
import { PropTypes } from 'prop-types';
import apigClientFactory from 'aws-api-gateway-client';
import Loading from '../Loading';
import UsersList from '../UsersList';
import LeftNav from '../LeftNav';
import UserDetail from '../UserDetail';
import NewUserModal from '../NewUserModal';
import './index.css';
import { addUsers } from '../../actions/users';
import { setIsLoading } from '../../actions/loadingdata';
import appConfig from '../../appConfig.json';

class Users extends Component {
  constructor(props) {
    super(props);
    const { location: { search } } = this.props;
    this.state = {
      users: [],
      qs: queryString.parse(search),
      newUserModalActive: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.escFunction = this.escFunction.bind(this);
  }

  componentWillMount() {
    const { setIsLoading, addUsers } = this.props;
    const { qs: { id } } = this.state;
    if (id === undefined) {
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

        // console.warn(setIsLoading());
        // console.warn(this.props.setIsLoading);
        setIsLoading(true);
        // this.props.setIsLoading(true);
        const apigClient = apigClientFactory.newClient(config);
        apigClient.invokeApi({}, appConfig.apis.users.uri, 'GET', { queryParams: { fields: appConfig.apis.users.fields } }, {})
          .then((response) => {
            setIsLoading(false);
            const arrUserParams = [];
            response.data.forEach((objItem) => {
              const objUserParams = {};
              Object.keys(objItem).forEach((key) => {
                switch (key) {
                  case 'created_at':
                    objUserParams[key] = new Date(objItem[key]);
                    break;
                  case 'updated_at':
                    objUserParams[key] = new Date(objItem[key]);
                    break;
                  case 'last_login':
                    objUserParams[key] = new Date(objItem[key]);
                    break;
                  default:
                    objUserParams[key] = objItem[key];
                }
              });
              arrUserParams.push(objUserParams);
            });
            addUsers(arrUserParams);
            self.setState({ users: arrUserParams });
          })
          .catch((err) => {
            console.warn(err);
          });
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
    this.setState({
      newUserModalActive: false,
    });
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
    const { users } = this.state;
    const { newUserModalActive } = this.state;
    const { qs: { id } } = this.state;
    if (id !== undefined) {
      return <UserDetail idUser={id} />;
    }

    return (
      <div className="Users">
        <Loading />
        <LeftNav pathname={window.location.pathname} />
        <NewUserModal active={newUserModalActive} />
        <div className="content">
          <div className="abdhr">
            <div className="abdhs">
              <h1>
                Users
              </h1>
            </div>
            <div className="abdht">
              <button
                type="button"
                onClick={e => this.handleClick(e)}
              >
                + New User
              </button>
            </div>
          </div>
          <UsersList users={users} />
        </div>
      </div>
    );
  }
}

Users.propTypes = {
  // addUsers: PropTypes.func.isRequired,
  // setIsLoading: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
    hash: PropTypes.string,
    state: PropTypes.string,
  }),
};

Users.defaultProps = {
  location: {},
};

function mapStateToProps() {
  return {};
}

const connectedStore = connect(mapStateToProps, { addUsers, setIsLoading });
// console.log(connectedStore);
const connectedStoreWithUsers = connectedStore(Users);
// console.log(connectedStoreWithUsers);
export default withRouter(connectedStoreWithUsers);
