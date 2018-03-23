myApp.service('ListService', ['$http', '$location', function($http, $location){
  console.log('ListService created');
  let self = this;

  self.list = {};

self.getList = function (id) {
  console.log('in getList', id);
  $http({
    method: 'GET',
    url: `/list/${id}`
  }).then(function (response){
    console.log('success in get list', response);
    self.list.array = response.data.rows;
    console.log(self.list.array, 'self.list.array in listservice');

  }).catch(function(error){
    console.log('error in get list', error);
  })
}
//end list get


}]);//end service
