(function(){
  'use strict';
  angular
    .module('meucarretoApp', [
      'ngAnimate',
      'ngCookies',
      'ngResource',
      'ngRoute',
      'ngTouch',
      'ui.utils.masks',
      'ui.multiselect',
      'ui.bootstrap'
    ])

    .config(configProvider)
    .config(router)
    .run(runAuth);

    function configProvider($httpProvider) {
      $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With']; 
    }

    function router($routeProvider, $httpProvider) {
      $httpProvider.interceptors.push('TokenInterceptor');

      $routeProvider
        .when('/', {
          templateUrl: 'views/main.html',
          controller: 'MainCtrl',
          controllerAs: 'main'
        })
        .when('/empresa', {
          templateUrl: 'views/company.html',
          controller: 'CompanyCtrl',
          controllerAs: 'company'
        })
        .when('/cadastrar', {
          templateUrl: 'views/register.html',
          controller: 'RegisterCtrl',
          controllerAs: 'register'
        })
        .when('/contato', {
          templateUrl: 'views/contact.html',
          controller: 'ContactCtrl',
          controllerAs: 'contact'
        })
        .when('/login', {
          templateUrl: 'views/login.html',
          controller: 'LoginCtrl',
          controllerAs: 'login'
        })
        .when('/result/:origin/:dest/:index', {
          templateUrl: 'views/result.html',
          controller: 'searchBarController',
          controllerAs: 'search'
        })
        .when('/painel', {
          templateUrl: 'views/painel/home.html',
          controller: 'LoginCtrl',
          controllerAs: 'painel',
          access: {
            requiredLogin: true
          }
        })
        .when('/painel/edit', {
          templateUrl: 'views/painel/edit.html',
          controller: 'LoginCtrl',
          controllerAs: 'register',
          access: {
            requiredLogin: true
          }
        })
        .when('/painel/logotipo', {
          templateUrl: 'views/painel/logotipo.html',
          controller: 'LoginCtrl',
          controllerAs: 'painel',
          access: {
            requiredLogin: true
          }
        })
        .otherwise({
          redirectTo: '/'
        });
    }

    function runAuth($rootScope, $window, $location, AuthenticationFactory) {
      // when the page refreshes, check if the user is already logged in
      AuthenticationFactory.check();
     
      $rootScope.$on('$routeChangeStart', routeChangeStart);
      $rootScope.$on('$routeChangeSuccess', routeChangeSuccess);

      function routeChangeStart(event, nextRoute) {
        if ((nextRoute.access && nextRoute.access.requiredLogin) && !AuthenticationFactory.isLogged) {
          $location.path('/login');
        } else {
          // check if user object exists else fetch it. This is incase of a page refresh
          if (!AuthenticationFactory.user) {
            AuthenticationFactory.user = $window.sessionStorage.user;
          }
          if (!AuthenticationFactory.userRole) {
            AuthenticationFactory.userRole = $window.sessionStorage.userRole;
          }

        }
      }
     
      function routeChangeSuccess() {
        $rootScope.showMenu = AuthenticationFactory.isLogged;
        $rootScope.role = AuthenticationFactory.userRole;
        // if the user is already logged in, take him to the home page
        if (AuthenticationFactory.isLogged && $location.path() === '/login') {
          $location.path('/painel');
        }
      }
    }
})();