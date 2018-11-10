
exports.handler = ({ authorizationToken, methodArn }, _, callback) => {
  const token = authorizationToken.replace('Bearer ', '')

  if (token !== process.env.IMPORT_TOKEN) {
    return callback('Unauthorized')
  }

  const principalId = btoa(Date.now() + Math.random())

  callback(null, {
    principalId,
    context,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: 'Allow',
          Resource: methodArn
        }
      ]
    }
  })
}
