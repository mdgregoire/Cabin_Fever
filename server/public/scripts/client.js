var myApp = angular.module('myApp', ['ngRoute']);

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
    .when('/register', {
      templateUrl: '/views/templates/register.html',
      controller: 'LoginController as vm'
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
    .when('/add_property', {
      templateUrl: '/views/templates/addProperty.html',
      controller: 'AddPropertyController as vm'
    })
    .when('/property', {
      templateUrl: '/views/templates/property.html',
      controller: 'PropertyController as vm'
    })
    .when('/chore', {
      templateUrl: '/views/templates/chore.html',
      controller: 'ChoreController as vm'
    })
    .when('/about', {
      templateUrl: '/views/templates/about.html',
      controller: 'AboutController as vm'
    })
    .when('/calendar', {
      templateUrl: '/views/templates/calendar.html',
      controller: 'CalendarController as vm'
    })
    .when('/opening_list', {
      templateUrl: '/views/templates/opening_list.html',
      controller: 'Opening_ListController as vm'
    })
    .when('/closing_list', {
      templateUrl: '/views/templates/closing_list.html',
      controller: 'Closing_ListController as vm'
    })
    .when('/user', {
      templateUrl: '/views/templates/viewProperty.html',
      controller: 'PropertyController as vm',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/info', {
      templateUrl: '/views/templates/info.html',
      controller: 'InfoController as vm',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .otherwise({
      template: '<h1>404</h1>'
    });
}]);
