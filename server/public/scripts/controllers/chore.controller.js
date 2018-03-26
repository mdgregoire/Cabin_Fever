myApp.controller('ChoreController', ['UserService', 'ViewPropertyService', 'ChoreService', '$location',
function(UserService, ViewPropertyService, ChoreService, $location) {
  console.log('ChoreController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;
  self.displayProperty = ViewPropertyService.displayProperty;
  self.displayCabin = ViewPropertyService.displayCabin;
  let cabinId = self.displayCabin.cabin[0].id;
  self.cabinOpenState = self.displayCabin.cabin[0].op_cl;

  self.chore = ChoreService.chore;
  self.completeChore = ChoreService.completeChore;
  self.addChore = ChoreService.addChore;
  self.getChores = ChoreService.getChores;
  self.getChores(cabinId).then($location.path("/chore"));

  self.newChore = ChoreService.newChore;


}]);
