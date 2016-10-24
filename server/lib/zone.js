var zoneTable = require('../controller/zoneTable.js');
var validator = require('validator');

var zone = {
 
  getAll: function(req, res) {
    zoneTable.list(function(data) {
        res.json(data);
    });
  },

  create: function(req, res) {
    var name = validator.trim(validator.escape(req.body.name));
    var cepInicial = parseInt(validator.trim(req.body.cepInicial));
    var cepFinal = parseInt(validator.trim(req.body.cepFinal));

    zoneTable.save(name, cepInicial, cepFinal, function(data) {
        res.json(data);
    });
  },
 
  delete: function(req, res) {
    var id = req.params.id;
    zoneTable.delete(id, function(data) {
        res.json(data);
    });
  }
};
 
var data = [];
module.exports = zone;