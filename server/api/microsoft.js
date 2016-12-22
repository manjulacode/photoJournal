var requestPromise = require('request-promise');
function MicrosoftVision() {
  var microsoftToken = '03e650f6c3cf468e86ade9346d927638';

  this.vision = function(photoURL) {
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
      console.log('microsoft api response:', res.tags)
      return res.tags;
    }).catch(function(err) {
      console.log('err requesting from microsoft', err);
    });
  },
  this.thumbnail = function(photoURL) {
    return requestPromise({
      'method': 'POST',
      'uri': 'https://api.projectoxford.ai/vision/v1.0/generateThumbnail?width=100&height=100&smartCropping=true', 
      'json': true, // this option automatically parses the JSON
      'headers': {
        'Ocp-Apim-Subscription-Key': microsoftToken
      },
      'body': {
        url: photoURL
      }
    }).then(function(res) {
      console.log('microsoft api response:', res.tags)
      // need to store teh binary stream as file in AWS S3
      return res.tags;
    }).catch(function(err) {
      console.log('err requesting from microsoft', err);
    });
  }
}

module.exports = new MicrosoftVision();