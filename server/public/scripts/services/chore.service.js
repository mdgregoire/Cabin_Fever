myApp.service('ChoreService', ['$http', '$location', function($http, $location){
  console.log('ChoreService created');
  let self = this;
  self.chore = {};

  self.getChores = function(id){
    console.log('in getChores', id);
    return $http({
      method: 'GET',
      url: `/chore/${id}`
    }).then(function (response){
      console.log('success in get list', response);
      self.chore.array = response.data.rows;
      console.log(self.chore.array, 'self.chore.array in choreservice');
    }).catch(function(error){
      console.log('error in get chores', error);
    })
  }
  //end getChores

  self.completeChore = function(choreId, cabinId){
    console.log('in completeChore', choreId, cabinId);
    return $http({
      method: 'DELETE',
      url: `/chore/${choreId}`
    }).then(function(response){
      console.log('success in get list', response);
      self.getChores(cabinId);
    }).catch(function(error){
      console.log('error in delete chore', error);
    })
  }
//end completeChore



}]);//end service
