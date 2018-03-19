myApp.controller('ChoreController', ['UserService', function(UserService) {
  console.log('ChoreController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;
}]);
