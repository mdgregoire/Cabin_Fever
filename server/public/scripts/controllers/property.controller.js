myApp.controller('PropertyController', ['UserService', 'ViewPropertyService', function(UserService, ViewPropertyService) {
  console.log('PropertyController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;

  self.cabins = ViewPropertyService.cabins;

  self.getCabins = ViewPropertyService.getCabins;
  self.getCabins(self.userObject.id);

}]);
