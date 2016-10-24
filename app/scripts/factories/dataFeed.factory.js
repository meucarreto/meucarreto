(function(){
	'use strict';
	angular.module('meucarretoApp').factory('DataFeed', DataFeed);
	DataFeed.$inject = ['$http'];

    function DataFeed($http) {
    	var address = 'http://meucarreto.com.br';
        var service = {
            getFeed: getFeed,
            register: register,
            getCarreto: getCarreto,
            getZone: getZone
        };

        return service;

        function getFeed() {
            return $http.get(address + '/transporterInfo')
                .then(success);

            function success(response) {
                return response.data;
            }
        }

        function register(info) {
            return $http({
                url: address + '/user',
                method: "POST",
                data: info
            })
            .then(success);

            function success(data, status) {
                var response = {
                    data: data,
                    status: status
                };
                return response;
            }
        }

        function getCarreto(origin, dest) {
            return $http.get(address + '/listAllCarretos/' + origin +'/' + dest)
                .then(success);

            function success(response) {
                return response.data;
            }
        }

        function getZone() {
            return $http.get(address + '/zone')
                .then(success);

            function success(response) {
                return response.data;
            }
        }

    }

})();

