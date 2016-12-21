// require mongoose
var mongoose = require('mongoose');

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
},
{
  timestamps: true 
});


module.exports = mongoose.model('User', UserSchema);
