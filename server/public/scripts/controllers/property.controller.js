myApp.controller('PropertyController', ['UserService', function(UserService) {
  console.log('PropertyController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;
}]);
