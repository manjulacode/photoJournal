
app.factory('userFactory', function ($http, $location, $window) {
  var factory = {};
  factory.signin = function (user, callback) {
    $http.post('/signIn', user).then(function(returned_data) {
      console.log('returned_data ', returned_data);
      if (typeof(callback) === 'function'){
          callback(returned_data.data);
        }
    })   
    .catch(function (err) {
      console.log(err)
    });
  };

  factory.signup = function (user, callback) {
    $http.post('/signUp', user).then(function(returned_data) {
      console.log('signup success');
      console.log(returned_data)
      console.log(returned_data.data.token)
      if (typeof(callback) === 'function'){
          callback(returned_data.data.token);
      }
      //callback(returned_data.data.token)
    })
    // .catch(function(err) {
    //   console.log(err)
    // })
  };
  
  factory.isAuth = function () {
    return !!$window.localStorage.getItem('manjula');
  };

  factory.signout = function () {
    $window.localStorage.removeItem('manjula');
    $location.path('/');
  };
  return factory;
  
});