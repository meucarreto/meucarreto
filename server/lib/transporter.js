var transporterInfoController = require('../controller/transporterInfo.js');
var validator = require('validator');
var transporter = {
 
  getAll: function(req, res) {
    transporterInfoController.list(function(data) {
        res.json(data);
    });
  },
 
  getOne: function(req, res) {
    var id = req.params.id;
    var product = data[0]; // Spoof a DB call
    res.json(product);
  },
 
  create: function(req, res) {
    var model = req.body.model;
    var typeTruck = req.body.typeTruck;
    var days = req.body.days;
    var schedules = req.body.schedules;
    transporterInfoController.save(model, typeTruck, days, schedules, function(data) {
        res.json(data);
    });
  },
 
  update: function(req, res) {
    var updateProduct = req.body;
    var id = req.params.id;
    data[id] = updateProduct // Spoof a DB call
    res.json(updateProduct);
  },
 
  delete: function(req, res) {
    var id = req.params.id;
    data.splice(id, 1) // Spoof a DB call
    res.json(true);
  }
};

var data = [];
 
module.exports = transporter;