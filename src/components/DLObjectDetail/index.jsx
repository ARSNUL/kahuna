import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import AWS from 'aws-sdk';
import apigClientFactory from 'aws-api-gateway-client';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getObjectById } from '../../actions/objects';
import { setIsLoading } from '../../actions/loadingdata';
import LeftNav from '../LeftNav';
import './index.css';
import appConfig from '../../appConfig.json';
import ObjectDetailButton from '../ObjectDetailButton';
import DateReadable from '../DateReadable';

class ObjectDetail extends Component {
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
    this.handleKeyPress = ObjectDetail.handleKeyPress.bind(this);
    this.handleSubmitEmailChange = ObjectDetail.handleSubmitEmailChange.bind(this);
    this.handleSubmitCancel = this.handleSubmitCancel.bind(this);
    this.handleSubmitPasswordReset = this.handleSubmitPasswordReset.bind(this);
    this.handleSubmitDeleteObject = this.handleSubmitDeleteObject.bind(this);
    this.handleSubmitUpdateObject = this.handleSubmitUpdateObject.bind(this);
    this.handleButtonClickResendEmailVerification = this
      .handleButtonClickResendEmailVerification.bind(this);
  }

  componentWillMount() {
    const { idObject, getObjectById } = this.props;
    // const objObject = getObjectById(idObject);
    this.setState({ params: getObjectById(idObject)[idObject] });
  }

  handleSubmitCancel(param) {
    // e.preventDefault();
    this.setState({ edit: { [param]: false } });
  }

  handleButtonClickResendEmailVerification(e) {
    e.preventDefault();
    const { setIsLoading } = this.props;
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
      setIsLoading(true);
      apigClient.invokeApi({}, appConfig.apis.resendEmailVerification.uri, 'POST', {}, {})
        .then(() => {
          setIsLoading(false);
          // let objState = { users: response.data, isLoading: false };
          self.setState(() => ({ isLoading: false }));
        });
      // .catch((err) => {
      //   console.warn(err);
      // });
    });
  }

  handleSubmitUpdateObject(e, userId, queryParams) {
    e.preventDefault();
    const { setIsLoading } = this.props;
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
      // console.log(additionalParams);
      setIsLoading(true);
      apigClient.invokeApi({}, `${appConfig.apis.userUpdate.uri}/${userId}`, 'PATCH', additionalParams, {})
        .then((response) => {
          setIsLoading(false);
          console.log(response);
          if (response.data.statusCode === 200) {
            this.setState({ params: response.data.body });
          }
          setIsLoading(false);
          // let objState = { users: response.data, isLoading: false };
          self.setState(() => ({ isLoading: false }));
        });
      // .catch((err) => {
      //   console.warn(err);
      // });
    });
  }

  handleSubmitDeleteObject(e, userId) {
    e.preventDefault();
    const { setIsLoading } = this.props;
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
          setIsLoading(false);
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
    const { setIsLoading } = this.props;
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
      setIsLoading(true);
      apigClient.invokeApi({}, appConfig.apis.userPassword.uri, 'POST', {}, {})
        .then(() => {
          setIsLoading(false);
          // let objState = { users: response.data, isLoading: false };
          self.setState(() => ({ isLoading: false }));
        });
      // .catch((err) => {
      //   console.warn(err);
      // });
    });
  }

  handleOnChangeEmail(event) {
    // this.state.params.email = event.target.value;
    // this.setState({ params: this.state.params });
    this.setState({ params: { email: event.target.value } });
  }

  handleOnChangeGivenName(event) {
    // this.state.params.name = event.target.value;
    // this.setState({ params: this.state.params });
    this.setState({ params: { name: event.target.value } });
  }

  handleOnChangeFamilyName(event) {
    // this.state.params.name = event.target.value;
    // this.setState({ params: this.state.params });
    this.setState({ params: { name: event.target.value } });
  }

  handleClick(e) {
    this.setState({ edit: { [e.target.id]: true } });
  }

  render() {
    const { params, edit } = this.state;
    if (params === undefined) {
      return (
        <div className="ObjectDetail" />
      );
    }

    let boolBlock = true;
    let strBlockAction = 'Block';
    if (params.blocked) {
      boolBlock = false;
      strBlockAction = 'Unblock';
    }
    return (
      <div className="ObjectDetail">
        <LeftNav />
        <div className="content">
          <div className="UDSummary">
            <div className="UDControls">
              <div>
                <button type="button" onClick={this.handleButtonClickResendEmailVerification}>
                  Reverify Email
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={this.handleSubmitPasswordReset}
                >
                  Reset Password
                </button>
              </div>
              <div>
                <button
                  type="button"
                  className="warning"
                  onClick={e => this.handleSubmitUpdateObject(
                    e,
                    params.user_id,
                    { blocked: boolBlock },
                  )}
                >
                  {strBlockAction}
                  {' '}
                  Object
                </button>
              </div>
              <div>
                <button
                  type="button"
                  className="danger"
                  onClick={e => this.handleSubmitDeleteObject(e, params.user_id)}
                >
                  Delete Object
                </button>
              </div>
            </div>
            <div className="UDIcon">
              <br />
            </div>
          </div>
          <div>
            <div className="UDt6">
              <h1>
                Object Details
              </h1>
              <div className="UDt2">
                <form>
                  <p>
                    Basic Information
                  </p>
                  <div className="field" role="presentation">
                    <div className="field-title">
                      First Name
                    </div>
                    {edit.given_name
                      ? (
                        <input
                          id="given_name"
                          type="text"
                          value={params.given_name}
                          onChange={e => this.handleOnChangeGivenName(e)}
                        />
                      )
                      : (
                        <p
                          role="presentation"
                          onKeyPress={this.handleKeyPress}
                          id="given_name"
                          onClick={edit.given_name ? null : e => this.handleClick(e)}
                        >
                          {params.given_name}
                        </p>
                      )}
                    {edit.given_name
                      ? (
                        <div>
                          <ObjectDetailButton
                            value="SUBMIT"
                            handler={ObjectDetail.handleSubmitGivenNameChange}
                          />
                          <ObjectDetailButton
                            value="CANCEL"
                            handler={e => this.handleSubmitCancel('given_name', e)}
                          />
                        </div>
                      ) : null}
                  </div>
                  <div className="field" role="presentation">
                    <div className="field-title">
                      Last Name
                    </div>
                    {edit.family_name
                      ? (
                        <input
                          id="family_name"
                          type="text"
                          value={params.family_name}
                          onChange={e => this.handleOnChangeFamilyName(e)}
                        />
                      )
                      : (
                        <p
                          role="presentation"
                          onKeyPress={this.handleKeyPress}
                          id="family_name"
                          onClick={edit.family_name ? null : e => this.handleClick(e)}
                        >
                          {params.family_name}
                        </p>
                      )}
                    {edit.family_name
                      ? (
                        <div>
                          <ObjectDetailButton
                            value="SUBMIT"
                            handler={ObjectDetail.handleSubmitFamilyNameChange}
                          />
                          <ObjectDetailButton
                            value="CANCEL"
                            handler={e => this.handleSubmitCancel('family_name', e)}
                          />
                        </div>
                      ) : null}
                  </div>
                  <div className="field">
                    <div className="field-title">
                      Email
                    </div>
                    {edit.useremail
                      ? (
                        <input
                          id="useremail"
                          type="text"
                          value={params.email}
                          onChange={e => this.handleOnChangeEmail(e)}
                        />
                      )
                      : (
                        <p
                          role="presentation"
                          onKeyPress={this.handleKeyPress}
                          id="useremail"
                          onClick={edit.useremail ? null : e => this.handleClick(e)}
                        >
                          {params.email}
                        </p>
                      )}
                    {edit.useremail
                      ? (
                        <div>
                          <ObjectDetailButton
                            value="SUBMIT"
                            handler={ObjectDetail.handleSubmitEmailChange}
                          />
                          <ObjectDetailButton
                            value="CANCEL"
                            handler={e => this.handleSubmitCancel('useremail', e)}
                          />
                        </div>
                      ) : null}
                  </div>
                  <div className="field">
                    <div className="field-title">
                      Email Verified
                    </div>
                    <span>
                      {params.email_verified ? 'yes' : 'no'}
                    </span>
                  </div>
                  <div className="field">
                    <div className="field-title">
                      Created At
                    </div>
                    <DateReadable id="created_at" value={params.created_at} />
                  </div>
                  <div className="field">
                    <div className="field-title">
                      Updated At
                    </div>
                    <DateReadable id="updated_at" value={params.updated_at} />
                  </div>
                  <div className="field">
                    <div className="field-title">
                      Last IP
                    </div>
                    <span id="lastip">
                      {params.last_ip}
                    </span>
                  </div>
                  <div className="field">
                    <div className="field-title">
                      Last Login
                    </div>
                    <DateReadable id="last_login" value={params.last_login} />
                  </div>
                  <div className="field">
                    <div className="field-title">
                      Logins Count
                    </div>
                    <span id="loginscount">
                      {params.logins_count}
                    </span>
                  </div>
                  <div className="field">
                    <div className="field-title">
                      Object ID
                    </div>
                    <span id="userid">
                      {params.user_id}
                    </span>
                  </div>
                  <div className="field">
                    <div className="field-title">
                      Blocked
                    </div>
                    <span id="blocked">
                      {params.blocked ? 'Yes' : 'No'}
                    </span>
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

ObjectDetail.propTypes = {
  idObject: PropTypes.string,
  setIsLoading: PropTypes.func.isRequired,
  getObjectById: PropTypes.func.isRequired,
};

ObjectDetail.defaultProps = {
  idObject: null,
};

function mapStateToProps(state) {
  return { state };
}

export default withRouter(connect(mapStateToProps, { getObjectById, setIsLoading })(ObjectDetail));
