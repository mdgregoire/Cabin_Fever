myApp.controller('ListController',  ['UserService', 'ViewPropertyService', 'ListService',
                                      'Upload', '$timeout', '$location', '$http', '$route',
  function(UserService, ViewPropertyService, ListService, Upload, $timeout, $location, $http, $route) {
  let self = this;
  let debug = false;

  self.userService = UserService;
  self.userObject = UserService.userObject;

  self.displayProperty = ViewPropertyService.displayProperty;
  self.displayCabin = ViewPropertyService.displayCabin;
  self.cabinId = self.displayCabin.cabin[0].id;
  self.cabinOpenState = self.displayCabin.cabin[0].op_cl;
  self.op_clToggle = ListService.op_clToggle;
  self.ListService = ListService;
  self.readyToToggle = ListService.readyToToggle;
  self.list = ListService.list;
  self.getList = ListService.getList
  self.clickList = ListService.clickList;
  self.showUpload = {show: false};
  self.clearList = ListService.clearList;
  self.getList(self.cabinId);
  self.deleteListConfirm = ListService.deleteListConfirm;
  self.deleteList = ListService.deleteList;
  self.currentPath = $location.path();

//this toggles the open/closed state on the db for the selected cabin
  self.op_clToggle = function(id, op_cl) {
    if(debug){console.log('in op_clToggle', id, op_cl);}
    $http({
      method: 'PUT',
      url: `property/toggle/${id}`,
      data: {data: op_cl}
    }).then(function(response){
      if(debug){console.log('success in op_clToggle', response);}
      self.clearList(id, op_cl);
      ViewPropertyService.displayProperty(self.cabinId).then($location.url('/list'));
      $route.reload();
      }).catch(function(error){
      if(debug){console.log('error in op_clToggle', error);}
    })
  }
  //end op_clToggle

//this uploads the .csv file to the db
  self.uploadFiles = function(file, errFiles) {
    self.f = file;
    self.errFile = errFiles && errFiles[0];
    if (file) {
      file.upload = Upload.upload({
          url: `/upload/${self.cabinId}`,
          data: {file: file}
      });
    file.upload.then(function (response) {
        $timeout(function () {
            file.result = response.data;
        });
    }, function (response) {
        if (response.status > 0)
            self.errorMsg = response.status + ': ' + response.data;
    }, function (evt) {
        file.progress = Math.min(100, parseInt(100.0 *
                                 evt.loaded / evt.total));
    });
    }
    swal({text: ".csv File Successfuly Uploaded!"})
    self.showUpload.show = false;
    $location.path("/property");
  }
//end uploadFiles

self.uploadToggle = function(){
  self.showUpload.show = true;
}

self.cancelUpload = function(){
  self.showUpload.show = false;
}
}]);// end ListController
