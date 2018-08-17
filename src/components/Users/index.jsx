import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { PropTypes } from 'prop-types';
import Loading from '../Loading';
import UsersList from '../UsersList';
import LeftNav from '../LeftNav';
import UserDetail from '../UserDetail';
import NewUserModal from '../NewUserModal';
import './index.css';
import * as usersActions from '../../actions/users';
import * as loadingdataActions from '../../actions/loadingdata';
import wrapper from '../../utils/cognito';
import appConfig from '../../appConfig.json';

class Users extends Component {
  static responseFailure(err) {
    console.warn(err);
  }

  constructor(props) {
    super(props);
    const { location } = this.props;
    this.state = {
      users: [],
      qs: queryString.parse(location.search),
      newUserModalActive: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.escFunction = this.escFunction.bind(this);
    this.responseSuccess = this.responseSuccess.bind(this);
    Users.responseFailure = Users.responseFailure.bind(this);
  }

  componentWillMount() {
    const { setIsLoading } = this.props;
    const { qs } = this.state;
    if (qs.id === undefined) {
      setIsLoading(true);
      wrapper(
        appConfig.apis.users.uri,
        'GET',
        this.responseSuccess,
        this.responseFailure,
        { queryParams: { fields: appConfig.apis.users.fields } },
      );
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

  responseSuccess(response) {
    const { setIsLoading, addUsers } = this.props;
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
    this.setState({ users: arrUserParams });
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
  addUsers: PropTypes.func.isRequired,
  setIsLoading: PropTypes.func.isRequired,
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

const connectedStore = connect(mapStateToProps, { ...usersActions, ...loadingdataActions });
const connectedStoreWithUsers = connectedStore(Users);
export default withRouter(connectedStoreWithUsers);
