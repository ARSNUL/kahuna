import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import AWS from 'aws-sdk';
import apigClientFactory from 'aws-api-gateway-client';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserById } from '../../actions/users';
import { setIsCreating, getIsCreating } from '../../actions/creatinguser';
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
    this.props.setIsCreating(true);
  }

  handleChange(e) {
    this.state[e.target.id] = e.target.value;
  }

  handleSave(e) {
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

      this.props.setIsCreating(true);
      const encodedFirstName = encodeURIComponent(this.state.firstName);
      const encodedLastName = encodeURIComponent(this.state.lastName);
      const encodedEmail = encodeURIComponent(this.state.email);
      const apigClient = apigClientFactory.newClient(config);
      apigClient.invokeApi({}, `${appConfig.apis.newUser.uri}/${encodedEmail}`, 'POST', {
        queryParams: {
          firstName: encodedFirstName,
          lastName: encodedLastName,
        },
      }, {})
        .then(() => {
          // console.warn(response);
          this.props.setIsCreating(false);
          // this.props.addUsers(response.data);
          // self.setState(() => ({ users: response.data }));
        });
      // .catch((err) => {
      //   console.warn(err);
      // });
    });
    // }
  }

  render() {
    if (this.props.active !== true) {
      return null;
    }
    const poop = this.props.getIsCreating;
    // poop(() => {
    //   console.log("in HERE?");
    // });
    return (
      <div className="NewUserModalBackground">
        <div
          role="presentation"
          className="NewUserModal"
          onKeyDown={this.handleEscKeyCloseModal}
        >
          <div className="ModalTitle">
            <h1>Create New User</h1>
            <button aria-hidden="true" className="ModalExit">x</button>
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
                id="submitNewUser"
                typeof="submit"
                onClick={e => this.handleSave(e)}
              >
                <span>{poop ? 'Creating' : 'Save'}</span>
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
  getUserById,
  setIsCreating,
  getIsCreating,
})(NewUserModal));
