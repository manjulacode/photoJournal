// require mongoose
var mongoose = require('mongoose');

// create the schema


var userSchema = new Schema({
  username: {
    type: String,
    index: true,
    type: required,
    unique: true
  },
  password: String,
  type: required,
  photos: [{
    type: Schema.Types.ObjectId,
    ref: 'Photos'
  }]
});

var photoSchema = new Schema({
  title: String,
  filePath: String,
  createdAt: Date,
  analyses: [],
  tags: []
});


module.exports = mongoose.model('User', UserSchema);
module.exports = mongoose.model('Photos', photoSchema);








