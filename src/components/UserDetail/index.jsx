import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import wrapper from '../../utils/cognito';
import * as usersActions from '../../actions/users';
import * as loadingdataActions from '../../actions/loadingdata';
import LeftNav from '../LeftNav';
import './index.css';
import appConfig from '../../appConfig.json';
import DetailButton from '../DetailButton';
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
    this.handleButtonClickResendEmailVerification = this
      .handleButtonClickResendEmailVerification.bind(this);
  }

  componentWillMount() {
    const { idUser, getUserById } = this.props;
    // const objUser = getUserById(idUser);
    this.setState({ params: getUserById(idUser)[idUser] });
  }

  handleSubmitCancel(param) {
    // e.preventDefault();
    this.setState({ edit: { [param]: false } });
  }

  handleButtonClickResendEmailVerification(e) {
    e.preventDefault();
    const { setIsLoading } = this.props;
    const onFailure = (err) => {
      console.warn(err);
    };
    const onSuccess = () => {
      setIsLoading(false);
      this.setState(() => ({ isLoading: false }));
    };
    wrapper(
      appConfig.apis.resendEmailVerification.uri,
      'POST',
      onSuccess,
      onFailure,
      {},
    );
  }

  handleSubmitUpdateUser(e, userId, queryParams) {
    e.preventDefault();
    const { setIsLoading } = this.props;
    const onFailure = (err) => {
      console.warn(err);
    };
    const onSuccess = (response) => {
      setIsLoading(false);
      if (response.data.statusCode === 200) {
        this.setState({ params: response.data.body });
      }
      setIsLoading(false);
      this.setState(() => ({ isLoading: false }));
    };
    setIsLoading(true);
    const additionalParams = {
      queryParams,
    };
    wrapper(
      `${appConfig.apis.userUpdate.uri}/${userId}`,
      'PATCH',
      onSuccess,
      onFailure,
      additionalParams,
    );
  }

  handleSubmitDeleteUser(e, userId) {
    e.preventDefault();
    const { setIsLoading } = this.props;
    const onFailure = (err) => {
      console.warn(err);
    };
    const onSuccess = () => {
      setIsLoading(false);
      this.setState(() => ({ isLoading: false }));
    };
    setIsLoading(true);
    wrapper(
      `${appConfig.apis.userDelete.uri}/${userId}`,
      'DELETE',
      onSuccess,
      onFailure,
      {},
    );
  }

  handleSubmitPasswordReset(e) {
    e.preventDefault();
    const { setIsLoading } = this.props;
    const onFailure = (err) => {
      console.warn(err);
    };
    const onSuccess = () => {
      setIsLoading(false);
      this.setState(() => ({ isLoading: false }));
    };
    setIsLoading(true);
    wrapper(
      appConfig.apis.userPassword.uri,
      'POST',
      onSuccess,
      onFailure,
      {},
    );
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
        <div className="UserDetail" />
      );
    }

    let boolBlock = true;
    let strBlockAction = 'Block';
    if (params.blocked) {
      boolBlock = false;
      strBlockAction = 'Unblock';
    }
    return (
      <div className="UserDetail">
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
                  onClick={e => this.handleSubmitUpdateUser(
                    e,
                    params.user_id,
                    { blocked: boolBlock },
                  )}
                >
                  {strBlockAction}
                  {' '}
                  User
                </button>
              </div>
              <div>
                <button
                  type="button"
                  className="danger"
                  onClick={e => this.handleSubmitDeleteUser(e, params.user_id)}
                >
                  Delete User
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
                User Details
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
                          <DetailButton
                            value="SUBMIT"
                            handler={UserDetail.handleSubmitGivenNameChange}
                          />
                          <DetailButton
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
                          <DetailButton
                            value="SUBMIT"
                            handler={UserDetail.handleSubmitFamilyNameChange}
                          />
                          <DetailButton
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
                          <DetailButton
                            value="SUBMIT"
                            handler={UserDetail.handleSubmitEmailChange}
                          />
                          <DetailButton
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
                      User ID
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

export default withRouter(connect(mapStateToProps,
  {
    ...usersActions,
    ...loadingdataActions,
  })(UserDetail));
