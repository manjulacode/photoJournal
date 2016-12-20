var login = require('../controllers/auth.js')
module.exports = function(app){
  app.post('/signUp', login.signUp);
  app.post('/signIn', login.signIn);
  
}