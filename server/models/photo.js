// require mongoose
var mongoose = require('mongoose');

var photoSchema = new Schema({
  title: String,
  imageUrl: {
    type: String,
    type: required 
  },
  tags: [],
  categories: [],
  apiResponse: []
},
{
  timestamps: true  
});

module.exports = mongoose.model('Photos', photoSchema);
