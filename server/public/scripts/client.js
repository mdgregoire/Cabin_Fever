var myApp = angular.module('myApp', ['ngRoute', 'ngFileUpload', 'ui.bootstrap']);

/// Routes ///
myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  console.log('myApp -- config')
  $routeProvider
    .when('/', {
      redirectTo: 'home'
    })
    .when('/home', {
      templateUrl: '/views/templates/home.html',
      controller: 'LoginController as vm',
    })
    .when('/view_property', {
      templateUrl: '/views/templates/viewProperty.html',
      controller: 'PropertyController as vm',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/property', {
      templateUrl: '/views/templates/property.html',
      controller: 'PropertyController as vm',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/chore', {
      templateUrl: '/views/templates/chore.html',
      controller: 'ChoreController as vm',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/about', {
      templateUrl: '/views/templates/about.html',
      controller: 'AboutController as vm'
    })
    .when('/list', {
      templateUrl: '/views/templates/list.html',
      controller: 'ListController as vm',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/user', {
      redirectTo: 'view_property'
    })
    .otherwise({
      template: '<h1>404</h1>'
    });
}]);
