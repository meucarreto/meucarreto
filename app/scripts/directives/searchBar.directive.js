(function () {
	'use strict';
	angular.module('meucarretoApp').directive('searchBar', searchBar);
	searchBar.$inject = ['DataFeed', '$location', 'SearchInfoService'];

	function searchBar(DataFeed, $location, SearchInfoService) {
		return {
			restrict: 'E',
			require: '^?NgModel',
			replace: 'true',
			templateUrl: 'views/directive-template/search-bar.html',
			link: function (scope) {
				scope.transporterInfo = {};
				scope.find = find;
				getFeed();

				function getFeed() {
					return DataFeed.getFeed().then(function (data) {
						var lastFeedPosition = data.length - 1;
						scope.transporterInfo = data[lastFeedPosition];
						scope.transporterInfo.model = scope.transporterInfo.model.sort();
						scope.modelSelected = scope.transporterInfo.model[0];
						return scope.transporterInfo;
					});
				}

				function find() {
					if (scope.cepOrigem === undefined || scope.cepOrigem.length < 8) {
						scope.errorOrigem = true;
					} else if (!scope.cepDestino ||scope.cepDestino.length < 8) {
						scope.errorOrigem = false;
						scope.errorDestino = true;
					} else {
						$location.path('/result/' + scope.cepOrigem + '/' + scope.cepDestino + '/' + scope.transporterInfo.model.indexOf(scope.modelSelected));
						var fields = {
							modelSelected: scope.modelSelected,
							cepOrigem: scope.cepOrigem,
							cepDestino: scope.cepOrigem
						};
						SearchInfoService.setFields(fields);
						scope.errorOrigem = false;
						scope.errorDestino = false;
					}

				}

			}
		};
	}

})();
