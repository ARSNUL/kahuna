import AWS from 'aws-sdk';
import apigClientFactory from 'aws-api-gateway-client';
import appConfig from '../appConfig.json';

function wrapper(targetUri, method, onSuccess, onFailure, objParams) {
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

  AWS.config.credentials.get(() => {
    const config = {
      invokeUrl: appConfig.api.baseUrl,
      accessKey: AWS.config.credentials.accessKeyId,
      secretKey: AWS.config.credentials.secretAccessKey,
      sessionToken: AWS.config.credentials.sessionToken,
      region: appConfig.cognito.region,
    };

    const apigClient = apigClientFactory.newClient(config);
    apigClient.invokeApi({}, targetUri, method, objParams, {})
      .then(onSuccess)
      .catch(onFailure);
  });
}

export default wrapper;
