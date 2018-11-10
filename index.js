
exports.handler = ({ authorizationToken, methodArn }, _, callback) => {
  const token = authorizationToken.replace('Bearer ', '')

  if (token !== process.env.IMPORT_TOKEN) {
    return callback('Unauthorized')
  }

  callback(null, {
    principalId: Date.now() + Math.random(),
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
