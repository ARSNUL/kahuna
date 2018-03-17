import React, { Component } from 'react';
import AWS from 'aws-sdk';
import apigClientFactory from 'aws-api-gateway-client';
import S3Objects from '../../components/S3Objects';
import './index.css';
import appConfig from '../../appConfig.json';
import LeftNav from '../../components/LeftNav';

export default class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = { s3objects: [] };
  }

  componentWillMount() {
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

      apigClient.invokeApi({}, '/cut/objects', 'GET', {}, {})
        .then((response) => {
          self.setState(() => ({ s3objects: response.data.objects }));
        });
      // .catch((err) => {
      //   console.warn(err);
      // });
    });
  }

  render() {
    const { s3objects } = this.state;
    return (
      <div className="Inventory">
        <LeftNav />
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
