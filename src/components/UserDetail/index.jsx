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
  static handleSubmitNameChange(e) {
    e.preventDefault();
  }

  static handleSubmitEmailChange(e) {
    e.preventDefault();
  }

  constructor(props) {
    super(props);
    this.state = {
      params: {},
      // accountVisibility: 'visible',
      editName: false,
    };
    this.handleClickName = this.handleClickName.bind(this);
    this.handleOnChangeName = this.handleOnChangeName.bind(this);
    this.handleOnChangeEmail = this.handleOnChangeEmail.bind(this);
    this.handleSubmitEmailChange = UserDetail.handleSubmitEmailChange.bind(this);
    this.handleSubmitPasswordReset = this.handleSubmitPasswordReset.bind(this);
  }

  componentWillMount() {
    const objUser = this.props.getUserById(this.props.idUser);
    this.setState({ params: objUser[this.props.idUser] });
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
        invokeUrl: appConfig.api.url,
        accessKey: AWS.config.credentials.accessKeyId,
        secretKey: AWS.config.credentials.secretAccessKey,
        sessionToken: AWS.config.credentials.sessionToken,
        region: appConfig.cognito.region,
      };

      const apigClient = apigClientFactory.newClient(config);
      this.props.setIsLoading(true);
      apigClient.invokeApi({}, appConfig.api.uris.userPassword, 'POST', {}, {})
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

  handleOnChangeName(event) {
    this.state.params.name = event.target.value;
    this.setState({ params: this.state.params });
  }

  handleClickName() {
    this.setState({ editName: true });
  }

  render() {
    let isOnClick = null;
    if (this.state.editName !== true) {
      isOnClick = e => this.handleClickName(e);
    }
    const elName = (
      <div className="UDt2">
        <form className="UDt3">
          <p>Basic Information</p>
          <div className="field" onClick={isOnClick} role="presentation">
            <div className="field-title">Name</div>
            {this.state.editName ?
              <input
                id="username"
                type="text"
                value={this.state.params.name}
                onChange={e => this.handleOnChangeName(e)}
              />
              : <span id="username">{this.state.params.name}</span>}
            {this.state.editName ? <input
              type="submit"
              onClick={UserDetail.handleSubmitNameChange}
            /> : null}
          </div>
          <div className="field">
            <div className="field-title">Email</div>
            {this.state.editName ?
              <input
                id="useremail"
                type="text"
                value={this.state.params.email}
                onChange={e => this.handleOnChangeEmail(e)}
              />
              : <span id="useremail">{this.state.params.email}</span>}
            {this.state.editName ? <input
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
      </div>);

    if (this.state.params === undefined) {
      return (
        <div className="UserDetail" />
      );
    }
    return (
      <div className="UserDetail">
        <LeftNav />
        <div className="UDSummary">
          <div className="UDControls">
            <button
              onClick={this.handleSubmitPasswordReset}
            >Reset Password
            </button>
            <img alt="Reset Password" src="/reset-password-24.svg" />
          </div>
          <div className="UDIcon"><br /></div>
        </div>
        <div className="UDt5">
          <div>
            <h1>Account</h1>
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
};

UserDetail.defaultProps = {
  idUser: null,
};

function mapStateToProps(state) {
  return { state };
}

export default withRouter(connect(mapStateToProps, { getUserById, setIsLoading })(UserDetail));
