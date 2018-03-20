myApp.service('ViewPropertyService', ['$http', '$location', function($http, $location){
  console.log('ViewPropertyService Loaded');
  let self = this;
  self.cabins = {};
  console.log(self.cabins, 'uo in ViewPropertyService');

self.getCabins = function (id) {
  console.log('in getCabins', id);
  $http({
    method: 'GET',
    url: `/property/${id}`
  }).then(function (response){
    console.log('success in get property', response);
    self.cabins.array = response.data.rows;
  }).catch(function(error){
    console.log('error in get property', error);
  })
}
//end property get


}]);//end service
