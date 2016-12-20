var mongoose = require('mongoose');
var User = require('../models/User');
var jwt = require('jwt-simple');
var bcrypt = require('bcryptjs');

function AuthController(){
  var secret = 'saltForPassword';

  this.signUp = function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({username:username}, function(err, data) {
      if (data) {
        console.log('User  found!');
        res.json({error: 'User already exists'});
        } else {
        // make a new user if not one
        var newUser = new User();
        newUser.username = username;

        newUser.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8));;        
        console.log('before user create ')
        newUser.save(function(err, doc) {
          if (err) {
              console.log('error');

          }
          console.log('after user create ')
        
          var token = jwt.encode(newUser, secret);
          res.json({token: token});
        })
        }
    })
    
  };

  this.signIn = function (req, res ) {
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({username:username}, function(err, data) {
      if (err) {
        console.log('User not found!');
        res.json({error: 'User not found'});
      } else {
        // make a new user if not one
        
        
        if (bcrypt.compareSync(password, data.password))
        {
          console.log('user found, password match ')
          var token = jwt.encode(data, secret);
          res.json({token: token});
        }  else {
            res.json({error: "Password doesn't match"});
        }
      }
    })
  }
}

module.exports = new AuthController();



