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

class NewUserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.email = null;
    this.state.firstName = null;
    this.state.lastName = null;
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

      // this.props.setIsLoading(true);
      const encodedEmail = encodeURIComponent(this.state.email);
      const apigClient = apigClientFactory.newClient(config);
      apigClient.invokeApi({}, `${appConfig.apis.newUser.uri}/${encodedEmail}`, 'POST', {}, {})
        .then((response) => {
          console.warn(response);
          // this.props.setIsLoading(false);
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
    if (this.props.active !== true) {
      return null;
    }
    return (
      <div className="NewUserModal">
        <form>
          <label htmlFor="firstName">First Name
            <input onChange={this.handleChange} autoComplete="first-name" id="firstName" name="firstName" />
          </label>
          <label htmlFor="LastName">Last Name
            <input onChange={this.handleChange} autoComplete="last-name" id="lastName" name="lastName" />
          </label>
          <label htmlFor="email">Email
            <input onChange={this.handleChange} autoComplete="email" id="email" name="email" />
          </label>
          <button typeof="submit" onClick={e => this.handleSave(e)}>Save</button>
        </form>
      </div>
    );
  }
}

NewUserModal.propTypes = {
  active: PropTypes.bool,
};

NewUserModal.defaultProps = {
  active: false,
};

function mapStateToProps(state) {
  return { state };
}

export default withRouter(connect(mapStateToProps, { getUserById, setIsLoading })(NewUserModal));
