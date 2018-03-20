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
import appConfig from '../../appConfig.json';
import UserDetailButton from '../UserDetailButton';
import DateReadable from '../DateReadable';

class UserDetail extends Component {
  static handleKeyPress(e) {
    e.preventDefault();
  }

  static handleSubmitGivenNameChange(e) {
    e.preventDefault();
  }

  static handleSubmitFamilyNameChange(e) {
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
        given_name: false,
        family_name: false,
        useremail: false,
      },
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleOnChangeGivenName = this.handleOnChangeGivenName.bind(this);
    this.handleOnChangeFamilyName = this.handleOnChangeFamilyName.bind(this);
    this.handleOnChangeEmail = this.handleOnChangeEmail.bind(this);
    this.handleKeyPress = UserDetail.handleKeyPress.bind(this);
    this.handleSubmitEmailChange = UserDetail.handleSubmitEmailChange.bind(this);
    this.handleSubmitCancel = this.handleSubmitCancel.bind(this);
    this.handleSubmitPasswordReset = this.handleSubmitPasswordReset.bind(this);
    this.handleSubmitDeleteUser = this.handleSubmitDeleteUser.bind(this);
    this.handleSubmitUpdateUser = this.handleSubmitUpdateUser.bind(this);
    this.handleButtonClickResendEmailVerification =
      this.handleButtonClickResendEmailVerification.bind(this);
  }

  componentWillMount() {
    const objUser = this.props.getUserById(this.props.idUser);
    this.setState({ params: objUser[this.props.idUser] });
  }

  handleSubmitCancel(param) {
    // e.preventDefault();
    this.setState({ edit: { [param]: false } });
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

  handleSubmitUpdateUser(e, userId, queryParams) {
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
      // this.props.setIsLoading(true);
      const additionalParams = {
        queryParams,
      };
      apigClient.invokeApi({}, `${appConfig.apis.userUpdate.uri}/${userId}`, 'PATCH', additionalParams, {})
        .then(() => {
          // console.log(response);
          this.props.setIsLoading(false);
          // let objState = { users: response.data, isLoading: false };
          self.setState(() => ({ isLoading: false }));
        });
      // .catch((err) => {
      //   console.warn(err);
      // });
    });
  }

  handleSubmitDeleteUser(e, userId) {
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
      // this.props.setIsLoading(true);
      apigClient.invokeApi({}, `${appConfig.apis.userDelete.uri}/${userId}`, 'DELETE', {}, {})
        .then(() => {
          // console.log(response);
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

  handleOnChangeGivenName(event) {
    this.state.params.name = event.target.value;
    this.setState({ params: this.state.params });
  }

  handleOnChangeFamilyName(event) {
    this.state.params.name = event.target.value;
    this.setState({ params: this.state.params });
  }

  handleClick(e) {
    this.setState({ edit: { [e.target.id]: true } });
  }

  render() {
    if (this.state.params === undefined) {
      return (
        <div className="UserDetail" />
      );
    }

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
                  className="warning"
                  onClick={e => this.handleSubmitUpdateUser(
                    e,
                    this.state.params.user_id,
                    { blocked: true },
                  )}
                >Block User
                </button>
              </div>
              <div>
                <button
                  className="danger"
                  onClick={e => this.handleSubmitDeleteUser(e, this.state.params.user_id)}
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
                  <div className="field" role="presentation">
                    <div className="field-title">First Name</div>
                    {this.state.edit.given_name ?
                      <input
                        id="given_name"
                        type="text"
                        value={this.state.params.given_name}
                        onChange={e => this.handleOnChangeGivenName(e)}
                      />
                      :
                      <p
                        role="presentation"
                        onKeyPress={this.handleKeyPress}
                        id="given_name"
                        onClick={this.state.edit.given_name ? null : e => this.handleClick(e)}
                      >{this.state.params.given_name}
                      </p>}
                    {this.state.edit.given_name ?
                      <div>
                        <UserDetailButton
                          value="SUBMIT"
                          handler={UserDetail.handleSubmitGivenNameChange}
                        />
                        <UserDetailButton
                          value="CANCEL"
                          handler={e => this.handleSubmitCancel('given_name', e)}
                        />
                      </div> : null}
                  </div>
                  <div className="field" role="presentation">
                    <div className="field-title">Last Name</div>
                    {this.state.edit.family_name ?
                      <input
                        id="family_name"
                        type="text"
                        value={this.state.params.family_name}
                        onChange={e => this.handleOnChangeFamilyName(e)}
                      />
                      :
                      <p
                        role="presentation"
                        onKeyPress={this.handleKeyPress}
                        id="family_name"
                        onClick={this.state.edit.family_name ? null : e => this.handleClick(e)}
                      >{this.state.params.family_name}
                      </p>}
                    {this.state.edit.family_name ?
                      <div>
                        <UserDetailButton
                          value="SUBMIT"
                          handler={UserDetail.handleSubmitFamilyNameChange}
                        />
                        <UserDetailButton
                          value="CANCEL"
                          handler={e => this.handleSubmitCancel('family_name', e)}
                        />
                      </div> : null}
                  </div>
                  <div className="field">
                    <div className="field-title">Email</div>
                    {this.state.edit.useremail ?
                      <input
                        id="useremail"
                        type="text"
                        value={this.state.params.email}
                        onChange={e => this.handleOnChangeEmail(e)}
                      />
                      :
                      <p
                        role="presentation"
                        onKeyPress={this.handleKeyPress}
                        id="useremail"
                        onClick={this.state.edit.useremail ? null : e => this.handleClick(e)}
                      >{this.state.params.email}
                      </p>}
                    {this.state.edit.useremail ?
                      <div>
                        <UserDetailButton
                          value="SUBMIT"
                          handler={UserDetail.handleSubmitEmailChange}
                        />
                        <UserDetailButton
                          value="CANCEL"
                          handler={e => this.handleSubmitCancel('useremail', e)}
                        />
                      </div> : null}
                  </div>
                  <div className="field">
                    <div className="field-title">Email Verified</div>
                    <span>{this.state.params.email_verified ? 'yes' : 'no'}</span>
                  </div>
                  <div className="field">
                    <div className="field-title">Created At</div>
                    <DateReadable id="created_at" value={this.state.params.created_at} />
                  </div>
                  <div className="field">
                    <div className="field-title">Updated At</div>
                    <DateReadable id="updated_at" value={this.state.params.updated_at} />
                  </div>
                  <div className="field">
                    <div className="field-title">Last IP</div>
                    <span id="lastip">{this.state.params.last_ip}</span>
                  </div>
                  <div className="field">
                    <div className="field-title">Last Login</div>
                    <DateReadable id="last_login" value={this.state.params.last_login} />
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
