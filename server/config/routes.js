var aws = require('aws-sdk')
var multer = require('multer')
var multerS3 = require('multer-s3')

var albumBucketName = 'mkphotojournal';
var bucketRegion = 'US Standard';

var s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {Bucket: albumBucketName}
});

var login = require('../controllers/auth.js')
var photo = require('../controllers/photo.js')

var upload = multer({
  storage: multerS3({
    s3: s3,
    acl: 'public-read',
    bucket: albumBucketName,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})
module.exports = function(app){
  app.post('/signUp', login.signUp);
  app.post('/signIn', login.signIn);
  app.post('/upload', photo.upload);
  
}