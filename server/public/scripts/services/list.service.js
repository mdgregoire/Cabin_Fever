myApp.service('ListService', ['$http', '$location', '$route', function($http, $location, $route){
  let self = this;
  let debug = false;
  self.readyToToggle = {toggle:false};
  self.list = {};

self.getList = function (id) {
  if(debug){console.log('in getList', id);}
  self.readyToToggle = {toggle:false};
  return $http({
    method: 'GET',
    url: `/list/${id}`
  }).then(function (response){
    if(debug){console.log('success in get list', response);}
    self.list.array = response.data.rows;
    if(debug){console.log(self.list.array, 'self.list.array in listservice');}
  }).catch(function(error){
    console.log('error in get list', error);
  })
}
//end list get

self.clickList = function (id, completed, cabinId, openState){
  if(debug){console.log('in clickList', id, completed);}
  $http({
    method: 'PUT',
    url: `/list/${id}`,
    data: {completed: completed}
  }).then(function (response) {
    if(debug){console.log('success in put list', response);}
    self.getList(cabinId).then(self.checkList(cabinId, openState));

  }).catch(function(error){
    console.log('error in put list', error);
  })
}
//end clickList

// This function checks the current state of the property (open or closed) and
// then checks to see if the opening or closing list has been completed after every
// check box toggle  If the appropriate list has been completed it will change the
// readyToToggle variable to true and then draw the toggle button on the DOM
self.checkList = function(cabinId, openState){
  let n=0;
  let x=1;
  // $route.reload();
  self.readyToToggle = {toggle:false};
if(debug){console.log(openState, 'openState in checklist');}
  for(i=0; i<self.list.array.length; i++){
    if(self.list.array[i].op_cl != openState){
      n++;
      if(debug){console.log(n, 'n in checklist');}
    }
  }
  for(i=0; i<self.list.array.length; i++){
    if(self.list.array[i].completed && (self.list.array[i].op_cl != openState)){
      x++;
      if(debug){console.log(x, 'x in checklist');}
      if (n == x){
        self.readyToToggle = {toggle:true};
        if(debug){console.log('readyToToggle', self.readyToToggle);}
        $route.reload();
      }
    }
  }
}
//end checkList

self.clearList = function(cabinId, openState){
  if(debug){console.log('in clearList', cabinId, openState);}
  $http({
    method: 'PUT',
    url: `/list/clear/${cabinId}`,
    data: {openState:openState}
  }).then(function (response) {
    if(debug){console.log('success in put list', response);}
    self.getList(cabinId).then(self.checkList(cabinId, openState));
    $route.reload();
    self.readyToToggle = {toggle:false};
  }).catch(function(error){
    if(debug){console.log('error in put list', error);}
  })
}
//end clearList

//this uses sweet alerts to create a confirm window fo delete cabin
self.deleteListConfirm = function (id){
  if(debug){console.log('in deleteCabinConfirm', id);}
  swal({
  title: "Are you sure?",
  text: "Once deleted, you will not be able to recover this list!",
  icon: "warning",
  buttons: true,
  dangerMode: true,
  closeOnClickOutside: true,
})
.then(function(response){
  if(debug){console.log(response, 'swal delete');}
  if(response){
    self.deleteList(id);
    swal("List Successfuly Deleted")
    }else{
        swal("Cancled Delete");
        }
      })
}
//end deleteCabinConfirm

self.deleteList = function(cabinId){
    $http({
      method: 'DELETE',
      url: `/list/delete/${cabinId}`
    }).then(function(response){
      if(debug){console.log('success in delete list', response);}
        self.list = {};
        $location.url('/property');
    }).catch(function(error){
      if(debug){console.log('error in delete list', error);}
    })
}
//end deleteList
}]);//end service
