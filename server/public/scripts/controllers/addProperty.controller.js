myApp.controller('AddPropertyController', ['UserService', 'AddPropertyService', function(UserService, AddPropertyService) {
  console.log('AddPropertyController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;

  self.upload = AddPropertyService.upload;
  self.addProperty = AddPropertyService.addProperty;
  self.newProperty = AddPropertyService.newProperty;
  self.newProperty.userObject = UserService.userObject;
}]);
