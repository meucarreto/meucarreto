(function(){
	'use strict';
	angular.module('meucarretoApp').service('SearchInfoService', SearchInfoService);
	SearchInfoService.$inject = [];

    function SearchInfoService($http) {
      var self = this;
      var field = {};
      self.setFields = setFields;
      self.getFields = getFields;

      function setFields(data) {
        field = data;
      }

      function getFields() {
        return field;
      }
    }

})();

