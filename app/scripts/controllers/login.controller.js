(function(){
	'use strict';
	angular.module('meucarretoApp').controller('LoginCtrl', LoginCtrl);
	LoginCtrl.$inject = ['$scope', '$window', '$location', 'UserAuthFactory', 'AuthenticationFactory', 'DataFeed'];
	
	function LoginCtrl($scope, $window, $location, UserAuthFactory, AuthenticationFactory, DataFeed) {
	  	var self = this;
	  	self.logout = logout;
	  	self.makeLogin = makeLogin;
	  	self.getUsername = getUsername;
	  	self.getUserInfo = getUserInfo;
	  	self.updateUserInfo = updateUserInfo;
	  	self.error = false;
	  	self.transporterInfo = {};
	  	self.zone = {};
	  	self.registrationData = getUserInfo();
		getFeed();
		getZone();

		function getFeed() {
			return DataFeed.getFeed().then(function (data) {
				var lastFeedPosition = data.length - 1;
				self.transporterInfo = data[lastFeedPosition];
				self.modelSelected = self.transporterInfo.model[0];
				return self.transporterInfo;
			});
		}

		function getZone() {
			return DataFeed.getZone().then(function (data) {
				self.zone = data;
				return self.zone;
			});
		}

		function logout() {
	      UserAuthFactory.logout();
	    }

		function makeLogin(user) {
			if (user.username && user.password) {
				UserAuthFactory.login(user.username, user.password).success(function(data) {

				  AuthenticationFactory.isLogged = true;
				  AuthenticationFactory.user = data.user[0].name;
				  AuthenticationFactory.userRole = data.user[0].role;
				  AuthenticationFactory.userInfo = data.user[0];
				  $window.sessionStorage.token = data.token;
				  $window.sessionStorage.user = data.user[0].name; // to fetch the user details on refresh
				  $window.sessionStorage.userRole = data.user.role; // to fetch the user details on refresh
				  $window.sessionStorage.userInfo = data.user[0]; // to fetch the user details on refresh


				  $location.path("/painel");

				}).error(function() {
				  self.error = true;
				});
			} else {
				self.error = false;
			}

		}

		function getUsername() {
			return AuthenticationFactory.user;
		}

		function getUserInfo() {
			return AuthenticationFactory.userInfo;	
		}

		function updateUserInfo() {
			self.registrationData = getUserInfo();
			return 'bla';
		}
	}
	    
})();