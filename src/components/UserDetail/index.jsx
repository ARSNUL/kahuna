import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import AWS from 'aws-sdk';
import apigClientFactory from 'aws-api-gateway-client';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserById } from '../../actions/users';
import { setIsLoading } from '../../actions/loadingdata';
import LeftNav from '../../components/LeftNav';
import './index.css';
import appConfig from '../../config.json';

class UserDetail extends Component {
  static handleSubmitFirstNameChange(e) {
    e.preventDefault();
  }

  static handleSubmitLastNameChange(e) {
    e.preventDefault();
  }

  static handleSubmitEmailChange(e) {
    e.preventDefault();
  }

  constructor(props) {
    super(props);
    this.state = {
      params: {},
      edit: {
        firstname: false,
        lastname: false,
        useremail: false,
      },
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleOnChangeFirstName = this.handleOnChangeFirstName.bind(this);
    this.handleOnChangeLastName = this.handleOnChangeLastName.bind(this);
    this.handleOnChangeEmail = this.handleOnChangeEmail.bind(this);
    this.handleSubmitEmailChange = UserDetail.handleSubmitEmailChange.bind(this);
    this.handleSubmitPasswordReset = this.handleSubmitPasswordReset.bind(this);
    this.handleSubmitDeleteUser = this.handleSubmitDeleteUser.bind(this);
    this.handleButtonClickResendEmailVerification =
      this.handleButtonClickResendEmailVerification.bind(this);
  }

  componentWillMount() {
    const objUser = this.props.getUserById(this.props.idUser);
    this.setState({ params: objUser[this.props.idUser] });
  }

  handleButtonClickResendEmailVerification(e) {
    e.preventDefault();
    const userPool = appConfig.cognito.poolId;
    const token = localStorage.getItem('id_token');
    AWS.config.region = appConfig.cognito.region;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: userPool,
      Logins: {
        [appConfig.auth0.domain]: token,
      },
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

      const apigClient = apigClientFactory.newClient(config);
      this.props.setIsLoading(true);
      apigClient.invokeApi({}, appConfig.apis.resendEmailVerification.uri, 'POST', {}, {})
        .then(() => {
          this.props.setIsLoading(false);
          // let objState = { users: response.data, isLoading: false };
          self.setState(() => ({ isLoading: false }));
        });
      // .catch((err) => {
      //   console.warn(err);
      // });
    });
  }

  handleSubmitDeleteUser(e) {
    e.preventDefault();
    const userPool = appConfig.cognito.poolId;
    const token = localStorage.getItem('id_token');
    AWS.config.region = appConfig.cognito.region;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: userPool,
      Logins: {
        [appConfig.auth0.domain]: token,
      },
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

      const apigClient = apigClientFactory.newClient(config);
      this.props.setIsLoading(true);
      apigClient.invokeApi({}, appConfig.apis.userDelete.uri, 'POST', {}, {})
        .then(() => {
          this.props.setIsLoading(false);
          // let objState = { users: response.data, isLoading: false };
          self.setState(() => ({ isLoading: false }));
        });
      // .catch((err) => {
      //   console.warn(err);
      // });
    });
  }

  handleSubmitPasswordReset(e) {
    e.preventDefault();
    const userPool = appConfig.cognito.poolId;
    const token = localStorage.getItem('id_token');
    AWS.config.region = appConfig.cognito.region;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: userPool,
      Logins: {
        [appConfig.auth0.domain]: token,
      },
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

      const apigClient = apigClientFactory.newClient(config);
      this.props.setIsLoading(true);
      apigClient.invokeApi({}, appConfig.apis.userPassword.uri, 'POST', {}, {})
        .then(() => {
          this.props.setIsLoading(false);
          // let objState = { users: response.data, isLoading: false };
          self.setState(() => ({ isLoading: false }));
        });
      // .catch((err) => {
      //   console.warn(err);
      // });
    });
  }

  handleOnChangeEmail(event) {
    this.state.params.email = event.target.value;
    this.setState({ params: this.state.params });
  }

  handleOnChangeFirstName(event) {
    this.state.params.name = event.target.value;
    this.setState({ params: this.state.params });
  }

  handleOnChangeLastName(event) {
    this.state.params.name = event.target.value;
    this.setState({ params: this.state.params });
  }

  handleClick(e) {
    // console.warn(e.target.id);
    this.setState({ edit: { [e.target.id]: true } });
  }

  render() {
    if (this.state.params === undefined) {
      return (
        <div className="UserDetail" />
      );
    }

    const isOnClickFirstName = this.state.edit.firstname ? null : e => this.handleClick(e);
    const isOnClickLastName = this.state.edit.lastname ? null : e => this.handleClick(e);
    const isOnClickUserEmail = this.state.edit.useremail ? null : e => this.handleClick(e);

    return (
      <div className="UserDetail">
        <LeftNav />
        <div className="content">
          <div className="UDSummary">
            <div className="UDControls">
              <div>
                <button onClick={this.handleButtonClickResendEmailVerification}>
                  Reverify Email
                </button>
              </div>
              <div>
                <button
                  onClick={this.handleSubmitPasswordReset}
                >Reset Password
                </button>
              </div>
              <div>
                <button
                  className="danger"
                  onClick={this.handleSubmitDeleteUser}
                >Delete User
                </button>
              </div>
            </div>
            <div className="UDIcon"><br /></div>
          </div>
          <div>
            <div className="UDt6">
              <h1>User Details</h1>
              <div className="UDt2">
                <form>
                  <p>Basic Information</p>
                  <div className="field" onClick={isOnClickFirstName} role="presentation">
                    <div className="field-title">First Name</div>
                    {this.state.edit.firstname ?
                      <input
                        id="firstname"
                        type="text"
                        value={this.state.params.firstname}
                        onChange={e => this.handleOnChangeFirstName(e)}
                      />
                      : <p id="firstname">{this.state.params.firstname}</p>}
                    {this.state.edit.firstname ? <input
                      type="submit"
                      onClick={UserDetail.handleSubmitFirstNameChange}
                    /> : null}
                  </div>
                  <div className="field" onClick={isOnClickLastName} role="presentation">
                    <div className="field-title">Last Name</div>
                    {this.state.edit.lastname ?
                      <input
                        id="lastname"
                        type="text"
                        value={this.state.params.lastname}
                        onChange={e => this.handleOnChangeLastName(e)}
                      />
                      : <p id="lastname">{this.state.params.lastname}</p>}
                    {this.state.edit.lastname ? <input
                      type="submit"
                      onClick={UserDetail.handleSubmitLastNameChange}
                    /> : null}
                  </div>
                  <div className="field" onClick={isOnClickUserEmail} role="presentation">
                    <div className="field-title">Email</div>
                    {this.state.edit.useremail ?
                      <input
                        id="useremail"
                        type="text"
                        value={this.state.params.email}
                        onChange={e => this.handleOnChangeEmail(e)}
                      />
                      : <span id="useremail">{this.state.params.email}</span>}
                    {this.state.edit.useremail ? <input
                      type="submit"
                      onClick={UserDetail.handleSubmitEmailChange}
                    /> : null}
                  </div>
                  <div className="field">
                    <div className="field-title">Email Verified</div>
                    <span>{this.state.params.email_verified ? 'yes' : 'no'}</span>
                  </div>
                  <div className="field">
                    <div className="field-title">Created At</div>
                    <span id="createdat">{this.state.params.created_at}</span>
                  </div>
                  <div className="field">
                    <div className="field-title">Updated At</div>
                    <span id="updatedat">{this.state.params.updated_at}</span>
                  </div>
                  <div className="field">
                    <div className="field-title">Last IP</div>
                    <span id="lastip">{this.state.params.last_ip}</span>
                  </div>
                  <div className="field">
                    <div className="field-title">Last Login</div>
                    <span id="lastlogin">{this.state.params.last_login}</span>
                  </div>
                  <div className="field">
                    <div className="field-title">Logins Count</div>
                    <span id="loginscount">{this.state.params.logins_count}</span>
                  </div>
                  <div className="field">
                    <div className="field-title">User ID</div>
                    <span id="userid">{this.state.params.user_id}</span>
                  </div>
                </form>
              </div>
            </div>
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
};

UserDetail.defaultProps = {
  idUser: null,
};

function mapStateToProps(state) {
  return { state };
}

export default withRouter(connect(mapStateToProps, { getUserById, setIsLoading })(UserDetail));
