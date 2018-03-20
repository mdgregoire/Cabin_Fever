myApp.service('AddPropertyService', ['$http', '$location', function($http, $location){
  console.log('AddPropertyService Loaded');
  var self = this;
  self.newProperty = {};
  self.client = filestack.init("ASYgNuRdqTkmiELkrSnfIz");


  //Filestack API method 'pick()' that opens the file picker
  self.upload = function(){
    console.log('in upload');
    self.client.pick({
      accept:'image/*',
      maxFiles: 1
    }).then(function(result){
      alert("Successful Upload!");
      self.newProperty.itemUrl = result.filesUploaded[0].url;
      console.log('self.newProperty.itemUrl',self.newProperty.itemUrl);

  });
}
//end filestack

self.addProperty = function(newProperty){
  console.log('in add property');
  console.log(newProperty);
  $http({
    method: 'POST',
    url: '/property',
    data: newProperty
  }).then(function (response){
    console.log('success in post', response);
  }).catch(function(error){
    console.log('error in post', error);
  })
}
//end property post


}]);//end service