myApp.controller('AboutController', ['UserService', function(UserService) {
  console.log('AboutController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;
}]);
