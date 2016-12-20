// require mongoose
var mongoose = require('mongoose');

// create the schema


var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', UserSchema);
// register the schema as a model
