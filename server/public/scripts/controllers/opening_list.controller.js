myApp.controller('Opening_ListController',  ['UserService', 'ViewPropertyService','Upload', '$timeout',
  function(UserService, ViewPropertyService, Upload, $timeout) {
  console.log('Opening_ListController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;

  self.displayProperty = ViewPropertyService.displayProperty;
  self.displayCabin = ViewPropertyService.displayCabin;
  let cabinId = self.displayCabin.cabin[0].id;
  self.showUpload = {show: false};

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
  }
//end uploadFiles

self.uploadToggle = function(){
  console.log('in uploadToggle', self.showUpload.show);
  self.showUpload.show = true;
}



}]);
