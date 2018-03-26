myApp.service('ListService', ['$http', '$location', '$route', function($http, $location, $route){
  console.log('ListService created');
  let self = this;
  self.readyToToggle = {toggle:false};
  self.list = {};


self.getList = function (id) {
  console.log('in getList', id);
  return $http({
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

self.clickList = function (id, completed, cabinId, openState){
  console.log('in clickList', id, completed);
  $http({
    method: 'PUT',
    url: `/list/${id}`,
    data: {completed: completed}
  }).then(function (response) {
    console.log('success in put list', response);
    self.getList(cabinId).then(self.checkList(cabinId, openState));

  }).catch(function(error){
    console.log('error in put list', error);
  })
}
//end clickList

self.checkList = function(cabinId, openState){
  let n=0;
  let x=1;

  for(i=0; i<self.list.array.length; i++){
    if(self.list.array[i].op_cl != openState){
      n++;
    }
  }
  for(i=0; i<self.list.array.length; i++){
    if(self.list.array[i].completed && (self.list.array[i].op_cl != openState)){
      x++;
      if (n == x){
        self.readyToToggle = {toggle:true};
        console.log('readyToToggle', self.readyToToggle);
        $route.reload();
      }
    }
  }
}
//end checkList

self.clearList = function(cabinId, openState){
  console.log('in clearList', cabinId, openState);
  $http({
    method: 'PUT',
    url: `/list/clear/${cabinId}`,
    data: {openState:openState}
  }).then(function (response) {
    console.log('success in put list', response);
    self.getList(cabinId).then(self.checkList(cabinId, openState));
  }).catch(function(error){
    console.log('error in put list', error);
  })
}
//end clearList

}]);//end service
