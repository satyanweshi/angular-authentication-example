'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'Authentication',
  'Home',
  'ngRoute',
  'ngCookies'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider
  		.when('/login', {
            controller: 'LoginController',
            templateUrl: 'authentication/authentication.template.html'
        })
        .when('/', {
            controller: 'HomeController',
            templateUrl: 'home/home.template.html'
        })
  		.otherwise({redirectTo: '/login'});
}])
.run(['$rootScope', '$location', '$cookieStore', '$http',
      function ($rootScope, $location, $cookieStore, $http) {
    // keep user logged in after page refresh
    $rootScope.globals = $cookieStore.get('globals') || {};
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in
        if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
            $location.path('/login');
        }
    });
}]);
