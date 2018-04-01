myApp.controller('AboutController', ['UserService', function(UserService) {
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;
}]);
