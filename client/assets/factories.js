
app.factory('userFactory', function ($http, $location, $window, Upload) {
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
    return !!$window.localStorage.getItem('userToken');
  };

  factory.signout = function () {
    $window.localStorage.removeItem('userToken');
    $window.localStorage.removeItem('username');
    $location.path('/');
  };
  
  factory.getPics = function (callback) {
    var user = $window.localStorage.getItem('username');
    $http.get('/user/'+user).then(function(returned_data) {
      console.log('returned_data ', returned_data);
      if (typeof(callback) === 'function'){
          callback(returned_data.data);
        }
    })   
    .catch(function (err) {
      console.log(err)
    });
  };

  factory.upload = function (file, callback) {
    console.log('file  :', file)
    var uploadfile = {};
    uploadfile.username = $window.localStorage.getItem('username')
    uploadfile.file = file;
    Upload.upload({
                url: '/upload', 
                data: uploadfile 
    }).then(function (resp) { 
      // if(resp.data.error_code === 0){ 
      //     $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
      // } else {
      //     $window.alert('an error occured');
      // }
      console.log('response ', resp)
    }, function (resp) { //catch error
      console.log('Error status: ' + resp.status);
      $window.alert('Error status: ' + resp.status);
    }, function (evt) { 
      console.log(evt);
      var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
      console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
      callback(progressPercentage)
      // = 'progress: ' + progressPercentage + '% '; // capture upload progress
    });
  };



  return factory;
  
});