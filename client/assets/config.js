var app = angular.module('app', ['ngRoute', 'ngMessages', 'ngFileUpload']);

app.config(function($routeProvider) {
    $routeProvider
    .when('/',{
        templateUrl: 'partials/signin.html',
        controller: 'AuthController'
    })
    .when('/signup', {
        templateUrl: 'partials/signup.html',
        controller: 'AuthController'
    })
    .when('/users/dash/', {
        templateUrl: 'partials/user_dashboard.html',
        controller: 'AuthController'
    })

    .otherwise({
        redirectTo: '/auth'
    })
})
