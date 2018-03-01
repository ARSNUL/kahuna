import React, { Component } from 'react';
import AWS from 'aws-sdk';
import apigClientFactory from 'aws-api-gateway-client';
import S3Objects from '../../components/S3Objects';
import './index.css';
import appConfig from '../../config.json';

export default class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = { s3objects: [] };
  }

  componentWillMount() {
    const userPool = 'us-west-2:2440ab57-1a73-4701-91a1-0bfbf60a58a2';
    const token = localStorage.getItem('id_token');
    AWS.config.region = 'us-west-2';
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: userPool,
      Logins: {
        'cloudywaters.auth0.com': token,
      },
    });

    const self = this;
    AWS.config.credentials.get(() => {
      const config = {
        // invokeUrl: 'https://6nkuz9s0m5.execute-api.us-west-2.amazonaws.com',
        invokeUrl: appConfig.api.url,
        accessKey: AWS.config.credentials.accessKeyId,
        secretKey: AWS.config.credentials.secretAccessKey,
        sessionToken: AWS.config.credentials.sessionToken,
        region: 'us-west-2',
      };

      const apigClient = apigClientFactory.newClient(config);

      apigClient.invokeApi({}, '/cut/objects', 'GET', {}, {})
        .then((response) => {
          self.setState(() => ({ s3objects: response.data.objects }));
        })
        .catch((err) => {
          console.warn(err);
        });
    });
  }

  render() {
    const { s3objects } = this.state;
    return (
      <div className="Inventory">
        <div className="lander">
          <h1>Inventory</h1>
          <h3>Search</h3>
          <form>
            <input typeof="text" />
          </form>
          <S3Objects s3items={s3objects} />
        </div>
      </div>
    );
  }
}
