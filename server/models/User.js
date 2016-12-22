// require mongoose
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    index: true,
    unique: true
  },
  password: String,
  photos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Photos'
  }]
},
{
  timestamps: true 
});


module.exports = mongoose.model('User', UserSchema);
