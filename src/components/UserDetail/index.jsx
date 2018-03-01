import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import AWS from 'aws-sdk';
import apigClientFactory from 'aws-api-gateway-client';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserById } from '../../actions/users';
import { setIsLoading } from '../../actions/loadingdata';
import './index.css';
import appConfig from '../../config.json';

class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {},
      accountVisibility: 'hidden',
      editName: false,
    };
    // this.state.accountVisibility = 'hidden';
    // this.state.editName = false;
    this.handleClick = this.handleClick.bind(this);
    this.handleClickName = this.handleClickName.bind(this);
    this.handleOnChangeName = this.handleOnChangeName.bind(this);
    this.handleOnChangeEmail = this.handleOnChangeEmail.bind(this);
    this.handleSubmitEmailChange = this.handleSubmitEmailChange.bind(this);
    this.handleSubmitPasswordReset = this.handleSubmitPasswordReset.bind(this);
  }

  componentWillMount() {
    const objUser = this.props.getUserById(this.props.idUser);
    this.setState({ params: objUser[this.props.idUser] });
  }

  handleSubmitNameChange(e) {
    e.preventDefault();
  }

  handleSubmitEmailChange(e) {
    e.preventDefault();
  }

  handleSubmitPasswordReset(e) {
    e.preventDefault();
    const userPool = appConfig.cognito.poolId;
    const token = localStorage.getItem('id_token');
    AWS.config.region = appConfig.cognito.region;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: userPool,
      Logins: {
        'cloudywaters.auth0.com': token,
      },
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

      const apigClient = apigClientFactory.newClient(config);
      this.props.setIsLoading(true);
      apigClient.invokeApi({}, '/cut/user/password', 'POST', {}, {})
        .then((response) => {
          console.log(response);
          this.props.setIsLoading(false);
          // let objState = { users: response.data, isLoading: false };
          self.setState(() => ({ isLoading: false }));
        })
        .catch((err) => {
          console.warn(err);
        });
    });
  }

  handleOnChangeEmail(event) {
    this.state.params.email = event.target.value;
    this.setState({ params: this.state.params });
  }

  handleOnChangeName(event) {
    this.state.params.name = event.target.value;
    this.setState({ params: this.state.params });
  }

  handleClickName() {
    this.setState({ editName: true });
  }

  handleClick() {
    this.setState({ accountVisibility: 'visible' });
  }

  render() {
    let elName;
    if (this.state.editName === true) {
      elName = (
        <form className="emk_t3" style={{ visibility: this.state.accountVisibility }}>
          <p>Basic Information</p>
          <div>
            <label htmlFor="username">Name&nbsp;
              <input
                id="username"
                type="text"
                value={this.state.params.name}
                onChange={e => this.handleOnChangeName(e)}
              />
            </label>
            <input
              type="submit"
              onClick={this.handleSubmitNameChange}
            />
          </div>
          <div>
            <label htmlFor="useremail">Email&nbsp;
              <input
                id="useremail"
                type="text"
                value={this.state.params.email}
                onChange={e => this.handleOnChangeName(e)}
              />
            </label>
            <input
              type="submit"
              onClick={this.handleSubmitEmailChange}
            />
          </div>
          <div>
            <label htmlFor="emailverified">Email Verified&nbsp;
              <span>{this.state.params.email_verified ? 'yes' : 'no'}</span>
            </label>
          </div>
          <div>
            <label htmlFor="createdat">Created At&nbsp;
              <span id="createdat">{this.state.params.created_at}</span>
            </label>
          </div>
          <div>
            <label htmlFor="updatedat">Updated At&nbsp;
              <span id="updatedat">{this.state.params.updated_at}</span>
            </label>
          </div>
          <div>
            <label htmlFor="lastip">Last IP&nbsp;
              <span id="lastip">{this.state.params.last_ip}</span>
            </label>
          </div>
          <div>
            <label htmlFor="lastlogin">Last Login&nbsp;
              <span id="lastlogin">{this.state.params.last_login}</span>
            </label>
          </div>
          <div>
            <label htmlFor="loginscount">Logins Count&nbsp;
              <span id="loginscount">{this.state.params.logins_count}</span>
            </label>
          </div>
          <div>
            <label htmlFor="userid">User ID&nbsp;
              <span id="userid">{this.state.params.user_id}</span>
            </label>
          </div>
        </form>);
    } else {
      elName = (
        <form
          className="emk_t3"
          style={{ visibility: this.state.accountVisibility }}
        >
          <p>Basic Information</p>
          <div onClick={e => this.handleClickName(e)} role="presentation">
            <label htmlFor="username">Name&nbsp;
              <span id="username">{this.state.params.name}</span>
            </label>
          </div>
          <div onClick={e => this.handleClickName(e)} role="presentation">
            <label htmlFor="useremail">Email&nbsp;
              <span id="useremail">{this.state.params.email}</span>
            </label>
          </div>
          <div>
            <label htmlFor="emailverified">Email Verified&nbsp;
              <span>{this.state.params.email_verified ? 'yes' : 'no'}</span>
            </label>
          </div>
          <div>
            <label htmlFor="createdat">Created At&nbsp;
              <span id="createdat">{this.state.params.created_at}</span>
            </label>
          </div>
          <div>
            <label htmlFor="updatedat">Updated At&nbsp;
              <span id="updatedat">{this.state.params.updated_at}</span>
            </label>
          </div>
          <div>
            <label htmlFor="lastip">Last IP&nbsp;
              <span id="lastip">{this.state.params.last_ip}</span>
            </label>
          </div>
          <div>
            <label htmlFor="lastlogin">Last Login&nbsp;
              <span id="lastlogin">{this.state.params.last_login}</span>
            </label>
          </div>
          <div>
            <label htmlFor="loginscount">Logins Count&nbsp;
              <span id="loginscount">{this.state.params.logins_count}</span>
            </label>
          </div>
          <div>
            <label htmlFor="userid">User ID&nbsp;
              <span id="userid">{this.state.params.user_id}</span>
            </label>
          </div>
        </form>
      );
    }

    if (this.state.params === undefined) {
      return (
        <div className="UserDetail" />
      );
    }
    return (
      <div className="UserDetail emk_t4">
        <div className="UDSummary">
          <div className="UDControls">
            <button
              onClick={this.handleSubmitPasswordReset}
            >Reset Password
            </button>
            <img alt="Reset Password" src="/reset-password-24.svg" />
          </div>
          <div className="UDIcon"><br /></div>
          <div className="UDSumCont">
            <div className="">{this.state.params.name}</div>
            <div className="">{this.state.params.email}</div>
            <div className="">{this.state.params.last_login}</div>
            <div className="">{this.state.params.blocked}</div>
          </div>
        </div>
        <div
          className="emk_t5"
          onClick={e => this.handleClick(e)}
          role="presentation"
        >
          <div>
            <h3>Account</h3>
            <p>View and modify user profile</p>
            {elName}
          </div>
        </div>
      </div>
    );
  }
}

UserDetail.propTypes = {
  idUser: PropTypes.string,
  setIsLoading: PropTypes.func.isRequired,
  getUserById: PropTypes.func.isRequired,
  params: PropTypes.shape({
    blocked: PropTypes.bool,
    created_at: PropTypes.string,
    email: PropTypes.string,
    email_verified: PropTypes.bool,
    last_ip: PropTypes.string,
    last_login: PropTypes.string,
    last_password_reset: PropTypes.string,
    logins_count: PropTypes.number,
    name: PropTypes.string,
    nickname: PropTypes.string,
    updated_at: PropTypes.string,
    user_id: PropTypes.string,
  }),
};

UserDetail.defaultProps = {
  idUser: null,
  params: {},
};

function mapStateToProps(state) {
  return { state };
}

export default withRouter(connect(mapStateToProps, { getUserById, setIsLoading })(UserDetail));
