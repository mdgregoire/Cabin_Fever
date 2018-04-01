myApp.service('AddPropertyService', ['$http', '$location', '$route',
              function($http, $location, $route){
  let self = this;
  let debug = false;
  self.newProperty = {};
  self.client = filestack.init("ASYgNuRdqTkmiELkrSnfIz");


  //Filestack API method 'pick()' that opens the file picker
  self.upload = function(){
    if(debug){console.log('in upload');}
    self.client.pick({
      accept:'image/*',
      maxFiles: 1
    }).then(function(result){
      $route.reload();
      self.newProperty.itemUrl = result.filesUploaded[0].url;
      if(debug){console.log('self.newProperty.itemUrl',self.newProperty.itemUrl);}
  });
}
//end filestack

//this adds a property to the DB
self.addProperty = function(newProperty){
  if(debug){console.log('in add property', newProperty);}
  $http({
    method: 'POST',
    url: '/property',
    data: newProperty
  }).then(function (response){
    if(debug){console.log('success in post', response);}
    self.newProperty = {};
    $location.path("/user");
  }).catch(function(error){
    if(debug){console.log('error in post', error);}
  })
}
//end property post
}]);//end service
