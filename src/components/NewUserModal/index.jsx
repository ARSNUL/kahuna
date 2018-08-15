import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import AWS from 'aws-sdk';
import apigClientFactory from 'aws-api-gateway-client';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as usersActions from '../../actions/users';
import * as creatinguserActions from '../../actions/creatinguser';
import './index.css';
import appConfig from '../../appConfig.json';

class NewUserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.email = null;
    this.state.firstName = null;
    this.state.lastName = null;
    this.state.active = props.active;
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    const { setIsCreating } = this.props;
    setIsCreating(true);
  }

  handleChange(e) {
    this.state[e.target.id] = e.target.value;
  }

  handleSave(e) {
    const { setIsCreating } = this.props;
    const { firstName, lastName, email } = this.state;
    e.preventDefault();
    // if (this.state.qs.id === undefined) {
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

    // const self = this;
    AWS.config.credentials.get(() => {
      const config = {
        invokeUrl: appConfig.api.baseUrl,
        accessKey: AWS.config.credentials.accessKeyId,
        secretKey: AWS.config.credentials.secretAccessKey,
        sessionToken: AWS.config.credentials.sessionToken,
        region: appConfig.cognito.region,
      };

      setIsCreating(true);
      const encodedFirstName = encodeURIComponent(firstName);
      const encodedLastName = encodeURIComponent(lastName);
      const encodedEmail = encodeURIComponent(email);
      const apigClient = apigClientFactory.newClient(config);
      apigClient.invokeApi({}, `${appConfig.apis.newUser.uri}/${encodedEmail}`, 'POST', {
        queryParams: {
          firstName: encodedFirstName,
          lastName: encodedLastName,
        },
      }, {})
        .then(() => {
          setIsCreating(false);
          // this.props.addUsers(response.data);
          // self.setState(() => ({ users: response.data }));
        })
        .catch((err) => {
          console.warn(err);
        });
    });
    // }
  }

  render() {
    const { active, getIsCreating } = this.props;
    if (active !== true) {
      return null;
    }
    return (
      <div className="NewUserModalBackground">
        <div
          role="presentation"
          className="NewUserModal"
          onKeyDown={this.handleEscKeyCloseModal}
        >
          <div className="ModalTitle">
            <h1>Create New User</h1>
            <button type="button" aria-hidden="true" className="ModalExit">x</button>
          </div>
          <div>
            <hr />
          </div>
          <form>
            <div className="field-group">
              <label htmlFor="firstName">
                <span>First Name</span>
                <input
                  className="field"
                  onChange={this.handleChange}
                  autoComplete="first-name"
                  id="firstName"
                  name="firstName"
                />
              </label>
            </div>
            <div className="field-group">
              <label htmlFor="lastName">
                <span>Last Name</span>
                <input
                  className="field"
                  onChange={this.handleChange}
                  autoComplete="last-name"
                  id="lastName"
                  name="lastName"
                />
              </label>
            </div>
            <div className="field-group">
              <label htmlFor="email">
                <span>Email</span>
                <input
                  className="field"
                  onChange={this.handleChange}
                  autoComplete="email"
                  id="email"
                  name="email"
                />
                <abbr title="required">*</abbr>
              </label>
            </div>
            <div>
              <hr />
            </div>
            <div className="field-group">
              <button
                type="submit"
                id="submitNewUser"
                typeof="submit"
                onClick={e => this.handleSave(e)}
              >
                <span>{getIsCreating ? 'Creating' : 'Save'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

NewUserModal.propTypes = {
  active: PropTypes.bool,
  setIsCreating: PropTypes.func.isRequired,
  getIsCreating: PropTypes.func.isRequired,
};

NewUserModal.defaultProps = {
  active: false,
};

function mapStateToProps(state) {
  return { state };
}

export default withRouter(connect(mapStateToProps, {
  ...usersActions,
  ...creatinguserActions,
})(NewUserModal));
