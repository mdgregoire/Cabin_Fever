myApp.controller('LoginController', ['$http', '$location', 'UserService', '$route',  function($http, $location, UserService, $route) {
    console.log('LoginController created');
    var self = this;
    self.user = {
      username: '',
      password: ''
    };
    self.message = '';
    self.showLoginToggle = {toggle:false};



    self.login = function () {
      console.log('in login');
      if (self.user.username === '' || self.user.password === '') {
        self.message = "Enter your username and password!";
      } else {
        console.log('sending to server...', self.user);
        $http.post('/api/user/login', self.user).then(
          function (response) {
            if (response.status == 200) {
              console.log('success: ', response.data);
              // location works with SPA (ng-route)
              $location.path('/user');
            } else {
              console.log('failure error: ', response);
              self.message = "Incorrect credentials. Please try again.";
            }
          },
          function (response) {
            console.log('failure error: ', response);
            self.message = "Incorrect credentials. Please try again.";
          });
      }
    };

    self.registerUser = function () {
      if (self.user.username === '' || self.user.password === '') {
        self.message = "Choose a username and password!";
      } else {
        console.log('sending to server...', self.user);
        $http.post('/api/user/register', self.user).then(function (response) {
          console.log('success');
          $location.path('/home');
        },
          function (response) {
            console.log('error');
            self.message = "Something went wrong. Please try again."
          });
      }
    }

    self.showLogin = function(toggle){
      console.log('in showLogin', toggle);
      if (toggle){
        self.showLoginToggle.toggle = false;
      } else{
        self.showLoginToggle.toggle = true;
      }
      // $location.url('/home');

    }
    //end showLogin


}]);
