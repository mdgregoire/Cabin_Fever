myApp.service('ViewPropertyService', ['$http', '$location', function($http, $location){
  console.log('ViewPropertyService Loaded');
  let self = this;
  self.cabins = {};
  self.displayCabin = {};


//this gets the information for the selected property
  self.displayProperty = function (id){
    console.log('in display property', id);
    $location.url('/property');

    $http({
      method: 'GET',
      url: `/property/display/${id}`
    }).then(function (response){
      console.log('success in get property', response);
      self.displayCabin.cabin = response.data.rows;
    }).catch(function(error){
      console.log('error in get property', error);
    })
  }
  //end display property

//this gets all properties owned by the logged in user
self.getCabins = function (id) {
  console.log('in getCabins', id);
  $http({
    method: 'GET',
    url: `/property/${id}`
  }).then(function (response){
    console.log('success in get properties', response);
    self.cabins.array = response.data.rows;
  }).catch(function(error){
    console.log('error in get properties', error);
  })
}
//end property get



}]);//end service
