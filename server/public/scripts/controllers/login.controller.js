myApp.controller('LoginController', ['$http', '$location', 'UserService', '$route',
                  function($http, $location, UserService, $route) {
    let self = this;
    let debug = false;

    self.user = {
      username: '',
      password: ''
    };
    self.showLoginToggle = {toggle:false};
    self.showRegisterToggle = {toggle:false};

    self.login = function () {
      if(debug){console.log('in login');}
      if (self.user.username === '' || self.user.password === '') {
      } else {
        if(debug){console.log('sending to server...', self.user);}
        $http.post('/api/user/login', self.user).then(
          function (response) {
            if (response.status == 200) {
              if(debug){console.log('success: ', response.data);}
              // location works with SPA (ng-route)
              $location.path('/user');
            } else {
              if(debug){console.log('failure error: ', response);}
              self.message = "Incorrect credentials. Please try again.";
            }
          },
          function (response) {
            if(debug){console.log('failure error: ', response);}
            self.message = "Incorrect credentials. Please try again.";
          });
      }
    };

    self.registerUser = function () {
      if (self.user.username === '' || self.user.password === '') {
      } else {
        if(debug){console.log('sending to server...', self.user);}
        $http.post('/api/user/register', self.user).then(function (response) {
          if(debug){console.log('success');}
          self.showLoginToggle.toggle = true;
          self.showRegisterToggle.toggle = false;
          $location.path('/home');
        },
          function (response) {
            if(debug){console.log('error');}
            // self.message = "Something went wrong. Please try again."
          });
      }
    }


//These 2 functions toggle between showing the partial for login or the partial for register
    self.showLogin = function(toggle){
      if(debug){console.log('in showLogin', toggle);}
      if (toggle){
        self.showLoginToggle.toggle = false;
      } else{
        self.showLoginToggle.toggle = true;
        self.showRegisterToggle.toggle = false;
      }
    }
    //end showLogin

    self.showRegister = function(toggle){
      if(debug){console.log('in showRegister', toggle);}
      if (toggle){
        self.showRegisterToggle.toggle = false;
      } else{
        self.showRegisterToggle.toggle = true;
        self.showLoginToggle.toggle = false;
      }
    }
    //end showRegister
}]);
