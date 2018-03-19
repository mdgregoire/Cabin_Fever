myApp.controller('Closing_ListController', ['UserService', function(UserService) {
  console.log('Closing_ListController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;
}]);
