myApp.service('ChoreService', ['$http', '$location', function($http, $location){
  let self = this;
  let debug = false;
  self.chore = {};
  self.newChore = {};

  self.getChores = function(id){
    if(debug){console.log('in getChores', id);}
    self.newChore.choreNotes = '';
    self.newChore.choreName = '';
    return $http({
      method: 'GET',
      url: `/chore/${id}`
    }).then(function (response){
      if(debug){console.log('success in get list', response);}
      self.chore.array = response.data.rows;
      if(debug){console.log(self.chore.array, 'self.chore.array in choreservice');}
    }).catch(function(error){
      if(debug){console.log('error in get chores', error);}
    })
  }
  //end getChores
  //this function deletes a chore when the checkbox is toggled
  self.completeChore = function(choreId, cabinId){
    if(debug){console.log('in completeChore', choreId, cabinId);}
    return $http({
      method: 'DELETE',
      url: `/chore/${choreId}`
    }).then(function(response){
      if(debug){console.log('success in get list', response);}
      self.getChores(cabinId);
    }).catch(function(error){
      if(debug){console.log('error in delete chore', error);}
    })
  }
//end completeChore

self.addChore = function (id, newChore){
  if(debug){console.log('in add chore', id);}
  return $http({
    method: 'POST',
    url: `/chore/${id}`,
    data: {newChore:newChore}
  }).then(function(response){
    if(debug){console.log('success in post chore', response);}
    self.getChores(id);
  }).catch(function(error){
    if(debug){console.log('error in post chore', error);}
  })
}
//end addChore
}]);//end service
