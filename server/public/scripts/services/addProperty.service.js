myApp.service('AddPropertyService', ['$http', '$location', '$route', function($http, $location, $route){
  console.log('AddPropertyService Loaded');
  let self = this;
  self.newProperty = {};
  self.client = filestack.init("ASYgNuRdqTkmiELkrSnfIz");


  //Filestack API method 'pick()' that opens the file picker
  //uploads a photo to the DB
  self.upload = function(){
    console.log('in upload');
    self.client.pick({
      accept:'image/*',
      maxFiles: 1
    }).then(function(result){
      // alert("Successful Upload!");
      $route.reload();

      self.newProperty.itemUrl = result.filesUploaded[0].url;
      console.log('self.newProperty.itemUrl',self.newProperty.itemUrl);

  });
}
//end filestack

//this adds a property to the DB
self.addProperty = function(newProperty){
  console.log('in add property');
  console.log(newProperty);
  $http({
    method: 'POST',
    url: '/property',
    data: newProperty
  }).then(function (response){
    console.log('success in post', response);
    self.newProperty = {};
    $location.path("/user");
  }).catch(function(error){
    console.log('error in post', error);
  })
}
//end property post


}]);//end service
