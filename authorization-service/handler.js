const createPolicy = (principalId, Effect, Resource) => ({
  principalId,
  policyDocument: {
      Version: '2012-10-17',
      Statement: [
          {
              Action: 'execute-api:Invoke',
              Effect,
              Resource,
          },
      ],
  },
  context: {
      'Access-Control-Allow-Origin': '*',
  },
});

module.exports.basicAuthorizer = async (event, ctx, cb) => {
  const authorizationHeader = event.headers.authorization;

  if (!authorizationHeader) {
      cb('Unauthorized');
  }

  try {
      const encodedCredentials = authorizationHeader.split(' ')[1];
      const credentialsBuffer = Buffer.from(encodedCredentials, 'base64');
      const credentials = credentialsBuffer.toString('utf-8').split(':');

      const [username, password] = credentials;

      const expectedPassword = process.env[username];
      const isAllowed = username && password === expectedPassword;

      cb(
        null,
        createPolicy('user', isAllowed ? 'Allow' : 'Deny', event.routeArn)
      );
  } catch (err) {
      cb(`Unauthorized: ${err.message}`);
  }
};
