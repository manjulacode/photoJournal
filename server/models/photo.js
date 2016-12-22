// require mongoose
var mongoose = require('mongoose');


var photoSchema = new mongoose.Schema({
  title: String,
  imageUrl: {
    type: String     
  },
  thumbnailUrl: {
    type: String
  },
  tags: [],
  categories: [],
  apiResponse: []
},
{
  timestamps: true  
});

module.exports = mongoose.model('Photos', photoSchema);
