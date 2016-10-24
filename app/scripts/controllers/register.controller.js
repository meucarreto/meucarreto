(function(){
	'use strict';
	angular.module('meucarretoApp').controller('RegisterCtrl', RegisterCtrl);
	RegisterCtrl.$inject = ['DataFeed'];

	function RegisterCtrl(DataFeed){
		var self = this;
		self.transporterInfo = {};
		self.zone = {};
		function init() {
			self.isUser = false;
			self.isTransporter = false;
			self.showPreRegister = true;
			self.showErrorMessage = false;
			self.registerWithSuccess = false;
			self.errorToRegister = false;
			self.zoneSelected = [];
			
			self.registrationData = {
				nf: 'false',
				security: 'false',
				isUser: self.isUser,
				isTransporter: self.isTransporter
			};
		}
		init();
		// Function exposed in view
		self.registerSession = registerSession;
		self.getZoneSelected = getZoneSelected;
		self.finish = finish;
		self.back = back;
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


		function registerSession(type) {
			if(type === 'transporter') {
				self.isTransporter = true;
			} else if(type === 'user') {
				self.isUser = true;	
			}
			self.showPreRegister = false;
		}

		function finish(form) {
			if(form.$invalid) {
				self.showErrorMessage = true;
				self.errorMessage = 'Por favor preencha todos os campos.';
			} else {
				if(self.registrationData.password === self.registrationData.confirmPassword) {
					self.registrationData.isUser = self.isUser;
					self.registrationData.isTransporter = self.isTransporter;
					self.registrationData.zone = self.getZoneSelected();
					DataFeed.register(self.registrationData).then(function (data) {
						if(!data.data.data.error) {
							self.showErrorMessage = false;
							self.registerWithSuccess = true;
						} else {
							self.showErrorMessage = true;
							self.errorMessage = data.data.data.error;
						}

					});
					
				} else {
					self.showErrorMessage = true;
					self.errorMessage = 'Por favor preencha todos os campos.';
				}
			}
		}

		function getZoneSelected() {
			var zone = [];
			for(var i = 0; i < self.zoneSelected.length; i++) {
				zone.push(self.zoneSelected[i].cepInicial);
				zone.push(self.zoneSelected[i].cepFinal);
			}
			return zone;
		}

		function back() {
			// Reset default state
			init();
		}
	}
	
	    

})();
