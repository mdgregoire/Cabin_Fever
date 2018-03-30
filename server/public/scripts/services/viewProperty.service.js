myApp.service('ViewPropertyService', ['$http', '$location', function($http, $location){
  console.log('ViewPropertyService Loaded');
  let self = this;
  self.cabins = {};
  self.displayCabin = {};
  self.userId = '';

//this gets the information for the selected property
  self.displayProperty = function (id){
    console.log('in display property', id);

    return $http({
      method: 'GET',
      url: `/property/display/${id}`
    }).then(function (response){
      console.log('success in get property', response);
      self.displayCabin.cabin = response.data.rows;
      $location.url('/property');
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

self.deleteCabinConfirm = function (id){
  console.log('in deleteCabinConfirm', id);
  swal({
  title: "Are you sure?",
  text: "Once deleted, you will not be able to recover this imaginary file!",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})
.then(function(response){
  console.log(response, 'swal delete');
  if(response){
    console.log('in if true');
    self.deleteCabin(id);
    swal("Poof! Cabin is gone.", {icon: "success",})
    }else{
        swal("Cabin is Safe");
        }
      })
}
//end deleteCabinConfirm

//this deletes the selected cabin from the db
self.deleteCabin = function(id){
  console.log('in deleteCabin', id);
  $http({
    method: 'DELETE',
    url: `/property/${id}`
  }).then(function(response){
    console.log('success in cabin delete', response);
    self.getCabins(self.userId);
  }).catch(function(error){
    console.log('error in delete property', error);
  })
}
//end deleteCabin

//this function updates the is_edit field in the db
self.showEditCabin = function (id, edit){
  console.log('in editCabin', id, edit);
  $http({
    method: 'PUT',
    url: `/property/showEdit/${id}`,
    data: {edit: edit}
  }).then(function(response){
    console.log('success in show edit', response);
    self.getCabins(self.userId);
  }).catch(function(error){
    console.log('error in show edit', error);
  })
}
//end showEditCabin

self.editCabin = function (cabinToEdit) {
  console.log('in edit cabin', cabinToEdit);
  let id = cabinToEdit.id
  $http({
    method: 'PUT',
    url: `/property/edit/${id}`,
    data: cabinToEdit
  }).then(function(response){
    console.log('success in edit', response);

    self.showEditCabin(id, true);
    self.getCabins(self.userId);
  }).catch(function(error){
    console.log('error in edit', error);
  })
}
//end editCabin


}]);//end service
