(function(){
  'use strict';
  angular.module('meucarretoApp').factory('UserAuthFactory', UserAuthFactory);
  UserAuthFactory.$inject = ['$window', '$location', '$http', 'AuthenticationFactory'];

  function UserAuthFactory($window, $location, $http, AuthenticationFactory) {
    return {
      login: function(username, password) {
        return $http.post('http://meucarreto.com.br/login', {
          username: username,
          password: password
        });
      },
      logout: function() {
   
        if (AuthenticationFactory.isLogged) {
   
          AuthenticationFactory.isLogged = false;
          delete AuthenticationFactory.user;
          delete AuthenticationFactory.userRole;
          delete AuthenticationFactory.userInfo;

          delete $window.sessionStorage.token;
          delete $window.sessionStorage.user;
          delete $window.sessionStorage.userRole;
          delete $window.sessionStorage.userInfo;
          $location.path("/login");
        }
   
      }
    }
  };

})();
