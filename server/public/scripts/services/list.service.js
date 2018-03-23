myApp.service('ListService', ['$http', '$location', function($http, $location){
  console.log('ListService created');
  let self = this;

  self.list = {
               test: [
                  {task_name: 'nametest',
                     task_notes: 'notetest',
                     op_cl: 'open',
                     property_name: 'cabin',
                     completed: 'false',
                     property_id: '111'},
                     {task_name: 'nametest2',
                           task_notes: 'notetest2',
                           op_cl: 'open2',
                           property_name: 'cabin2',
                           completed: 'false2',
                           property_id: '1112'}
                         ]
             };

console.log(self.list, 'list in service');





}]);//end service
