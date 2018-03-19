myApp.controller('CalendarController', ['UserService', function(UserService) {
  console.log('CalendarController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;
}]);
