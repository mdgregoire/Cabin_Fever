myApp.controller('Opening_ListController', ['UserService', function(UserService) {
  console.log('Opening_ListController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;
}]);
