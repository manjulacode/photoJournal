app.controller('AuthController', function($scope, userFactory, $window, $location){


  $scope.user = {};
  $scope.errorMsg = '';
  $scope.signin = function () {
    userFactory.signin($scope.user, function (data) {
      console.log('token ', data)
      if (data.token) {
        $window.localStorage.setItem('userToken', data.token);
        $location.path('/auth');
      } else {
        console.log('error: ', data.error)
        $scope.errorMsg = 'User/Password not found'
      }
      
    });  
  };

  $scope.signup = function () {
    userFactory.signup($scope.user, function (token) {

      $window.localStorage.setItem('userToken', data.token);
      $location.path('/auth');
    });
  };

  
});