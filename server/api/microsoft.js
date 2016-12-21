module.exports = function(photoURL) {
  var microsoftToken = 'To be copied token';
  return requestPromise({
    'method': 'POST',
    'uri': 'https://api.projectoxford.ai/vision/v1.0/tag', 
    'json': true, // this option automatically parses the JSON
    'headers': {
      'Ocp-Apim-Subscription-Key': microsoftToken
    },
    'body': {
      url: photoURL
    }
  }).then(function(res) {
    return res.tags;
  }).catch(function(err) {
    console.log('err requesting from microsoft', err);
  });
};