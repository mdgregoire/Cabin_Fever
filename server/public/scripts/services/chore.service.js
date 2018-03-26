myApp.service('ChoreService', ['$http', '$location', function($http, $location){
  console.log('ChoreService created');
  let self = this;
  self.chore = {};
  self.newChore = {};

  self.getChores = function(id){
    console.log('in getChores', id);
    self.newChore.choreNotes = '';
    self.newChore.choreName = '';
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

self.addChore = function (id, newChore){
  console.log('in add chore', id);
  return $http({
    method: 'POST',
    url: `/chore/${id}`,
    data: {newChore:newChore}
  }).then(function(response){
    console.log('success in post chore', response);
    self.getChores(id);
  }).catch(function(error){
    console.log('error in post chore', error);
  })
}
//end addChore


}]);//end service
