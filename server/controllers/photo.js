var mongoose = require('mongoose');
var User = require('../models/User');
var Photo = require('../models/photo');
var jwt = require('jwt-simple');
var bcrypt = require('bcryptjs');
var microsoft = require('../api/microsoft')

function PhotoController(){
  
  this.upload = function (req, res) {
    console.log('req.body : ', req.body)
    //console.log('Photocontroller upload. username:', req.user.username);
    if (!req.file) {
      console.log('Multer S3 failed to save file');
      res.status(404).send();
    } else {
      //req.files.forEach(function(imageFile) {
      var imageFile = req.file;

      var photo = new Photo();
      photo.title = req.body.title;
      photo.imageUrl = imageFile.location;
      photo.save(function(err, doc){
        if (err) {
          console.log('error in saving image upload: ', err)
        } else {
          microsoft.vision(imageFile.location).then(function(tags){
            // Filter by tags of 0.5 score or higher
            tags.forEach(function(tag) {
              if (tag.confidence > 0.5) {
                doc.tags.push(tag.name);
                console.log('doc.tags  ', doc.tags)
              }
            });
            doc.apiResponse = tags;
            // if (response.description) {
            //   doc.title = doc.title || response.description.captions[0].text;
            
            // }
            doc.save();
            console.log('doc  ',doc)
          })

          //now store the photo object in user table 
          User.findOne({username: req.body.username})
          .then(function(user) {
            console.log(user)
            user.photos.push(doc._id);   
            user.save(function(err) {
              res.status(201).send(doc._id);
            });
          })
          .catch(function(err) {
            console.log('Err saving user', err);
            res.status(404).send();
          });
        }
       
      });
    };
  };

  this.getUserPhotos = function (req, res ) {
    console.log('User get photos: ', req.params.username);
    var username = req.params.username;
    User.findOne({username:username}).populate('photos').exec(function(err, data) {
      console.log('User get photos result: ', req.params.username, data);
      res.json({'user': data});
    });
  }

}

module.exports = new PhotoController();



