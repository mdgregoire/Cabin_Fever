myApp.controller('Opening_ListController',  ['UserService', 'ViewPropertyService', 'ListService', 'Upload', '$timeout', '$location', '$http',
  function(UserService, ViewPropertyService, ListService, Upload, $timeout, $location, $http) {
  console.log('Opening_ListController created');
  var self = this;

  self.userService = UserService;
  self.userObject = UserService.userObject;
  self.displayProperty = ViewPropertyService.displayProperty;
  self.displayCabin = ViewPropertyService.displayCabin;

  let cabinId = self.displayCabin.cabin[0].id;
  self.cabinOpenState = self.displayCabin.cabin[0].op_cl;

  self.op_clToggle = ListService.op_clToggle;

  self.ListService = ListService;
  self.list = ListService.list;
  self.getList = ListService.getList
  self.getList(cabinId);

  self.showUpload = {show: false};


  self.op_clToggle = function(id, op_cl) {
    console.log('in op_clToggle', id, op_cl);
    $http({
      method: 'PUT',
      url: `property/toggle/${id}`,
      data: {data: op_cl}
    }).then(function(response){
      console.log('success in op_clToggle', response);
      ViewPropertyService.displayProperty(cabinId)
    }).catch(function(error){
      console.log('error in op_clToggle', error);
    })
  }
  //end op_clToggle



//this uploads the .csv file to the db
  self.uploadFiles = function(file, errFiles) {
    self.f = file;
    self.errFile = errFiles && errFiles[0];
    if (file) {
      file.upload = Upload.upload({
          url: `/upload/${cabinId}`,
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
    alert('File Uploaded!');
    self.showUpload.show = false;
    $location.path("/property");
  }
//end uploadFiles

self.uploadToggle = function(){
  console.log('in uploadToggle', self.showUpload.show);
  self.showUpload.show = true;
}

self.cancelUpload = function(){
  console.log('in cancel upload');
  self.showUpload.show = false;
}


}]);
