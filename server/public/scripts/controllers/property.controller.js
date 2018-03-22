myApp.controller('PropertyController', ['UserService', 'ViewPropertyService', function(UserService, ViewPropertyService) {
  console.log('PropertyController created');
  var self = this;

  self.userService = UserService;
  self.userObject = UserService.userObject;
  ViewPropertyService.userId = self.userObject.id;

  self.cabins = ViewPropertyService.cabins;

  self.getCabins = ViewPropertyService.getCabins;
  self.getCabins(self.userObject.id);

  self.displayProperty = ViewPropertyService.displayProperty;
  self.displayCabin = ViewPropertyService.displayCabin;

  self.deleteCabin = ViewPropertyService.deleteCabin;
  self.showEditCabin = ViewPropertyService.showEditCabin;
  self.editProperty = ViewPropertyService.editCabin;

}]);
