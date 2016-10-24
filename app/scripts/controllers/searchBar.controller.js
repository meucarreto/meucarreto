(function(){
	'use strict';
	angular.module('meucarretoApp').controller('searchBarController', searchBarController);
	searchBarController.$inject = ['DataFeed', '$routeParams'];

	function searchBarController(DataFeed, $routeParams) {
		var self = this;
		self.carretos = {};
		self.cepOrigem = $routeParams.origin;
		self.cepDestino = $routeParams.dest;
		self.modelSelectedIndex = $routeParams.index;
		self.getSchedules = getSchedules;
		self.getTypeTrucks = getTypeTrucks;
		self.applyFilters = applyFilters;
		getFeed();

		function getFeed() {
			return DataFeed.getFeed().then(function (data) {
				var lastFeedPosition = data.length - 1;
				self.transporterInfo = data[lastFeedPosition];
				self.modelSelected = self.transporterInfo.model.sort()[self.modelSelectedIndex];
				getCarreto();
				return self.transporterInfo;
			});
		}

		function getCarreto() {
			return DataFeed.getCarreto(self.cepOrigem, self.cepDestino).then(function (data) {
				self.message = '';
				self.carretos = data;
				applyFilters();
				return self.carretos;;
			});
		}

		function getSchedules(schedules) {
			var schedulesFormated = '';
			var splited = [];
			if(schedules && schedules.length > 0) {
				schedules.forEach(function(schedule){
					if(schedule) {
						splited = schedule.split("-");
						schedulesFormated += splited[0].trim() + 'h - ' + splited[1].trim() + 'h |';
					}
				});
			}
			return schedulesFormated;
		}

		function getTypeTrucks(trucks) {
			var formatedTrucks =  '';
			trucks.forEach(function(truck){
				formatedTrucks += truck + ' | ';
			});

			return formatedTrucks;
		}

		function applyFilters() {
			var tmpArray = [];
			self.carretos.forEach(function(carreto){
				if(carreto.models.indexOf(self.modelSelected) !== -1) {
					tmpArray.push(carreto);
				}
			});
			self.carretos = tmpArray;
		}
	}	    

})();
