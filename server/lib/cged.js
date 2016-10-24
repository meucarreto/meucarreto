'use strict';

var mongoose = require('mongoose');
exports.CGED = CGED;

function CGED(model) {
  var crudModel = {
    getAll: getAll,
    create: create,
    editById: editById,
    getById: getById,
    deleteById: deleteById
  };

  return crudModel;

  function getAll(req, res) {
    model.find(function(err, myModel) {
      if(err) {
        return res.status(500).send(err);
      }
      return res.status(200).json(myModel);
    });
  };

  function create(req, res) {
    var modelCreate = new model(req.body);
    modelCreate.save(function(err, myModel) {
      if(err) {
        return res.status(500).send(err);
      }
      return res.status(200).json(myModel);
    });
  };


  function editById(req, res) {
    model.findOneAndUpdate({ "_id": req.params.id }, req.body, function (err, myModel) {
      if(err) {
        res.status(500).send(err);
        return;
      }
      return res.status(200).json(myModel);
    });
  };

  function getById(req, res) {
    model.findOne({ "_id": req.params.id }, function(err, myModel) {
      if(err) {
        return res.status(500).send(err);
      }
      return res.status(200).json(myModel);
    });
  };

  function deleteById(req, res) {
    model.remove({ "_id": req.params.id }, function(err, myModel) {
      if(err) {
        return res.status(500).send(err);
      }
      return res.status(200).json(myModel);
    });
  };
}