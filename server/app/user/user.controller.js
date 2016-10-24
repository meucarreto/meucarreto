'use strict';

var mongoose = require('mongoose');
var UserModel = require('./user.model');
var CGED = require('../../lib/cged').CGED;
var crypto = require('crypto');

exports.editById = CGED(UserModel).editById;
exports.getById = CGED(UserModel).getById;
exports.getAll = CGED(UserModel).getAll;
exports.deleteById = CGED(UserModel).deleteById;
exports.listAllCarretos = listAllCarretos;
exports.save = save;

function listAllCarretos(req, res) {
  var newCepOrigin = parseInt(req.params.cepOrigem.toString().substring(0, 5));
  var newCepDestiny = parseInt(req.params.cepDestino.toString().substring(0, 5));

  var canGoToCepDestiny = false;
  var canGoToCepOrigin = false;
  var result = [];
  var ceps = [];

  UserModel.find(function (err, carretos) {
    if (err) {
      return res.status(500).send(err);
    }
    var carretosFiltered = [];
    carretos.forEach(function (carreto) {
      if (carreto.isTransporter) {
        ceps = carreto.zone;
        for(var i = 0; i < ceps.length; i++){
          if(newCepOrigin >= ceps[i] && newCepOrigin <= ceps[i+1]){
            canGoToCepOrigin = true;
          }
          if(newCepDestiny >= ceps[i] && newCepDestiny <= ceps[i+1]) {
            canGoToCepDestiny = true;
          }
        }
        if(canGoToCepOrigin && canGoToCepDestiny) {
            carreto.password = '';
            carretosFiltered.push(carreto);
        }        
      }
    });

    return res.status(200).json(carretosFiltered);
  });

};

exports.checkUser = function (username, password, callback) {
  var md5Pass = crypto.createHash('md5').update(password).digest('hex');
  var query = UserModel.find({ 'login': username, 'password': md5Pass }).select('name email login phone isUser isTransporter nf security model typeTruck days schedules ');
  query.exec(function (err, someValue) {
    console.log(someValue.length);
    if (err || someValue.length < 1) {
      callback({ error: 'Error to load userTable' });
    } else {
      callback(someValue);
    }

  });
};

function save(req, res) {
  var md5Pass = crypto.createHash('md5').update(req.body.password).digest('hex');

  UserModel.findOne({ login: req.body.login }, function (errorLogin, someValue) {
    if (errorLogin) {
      return res.status(200).json({ error: 'Error to find login' });
    } else if (someValue) {
      return res.status(200).json({ error: 'Usuário que está tentando utilizar já está em uso.' });
    } else {
      UserModel.findOne({ email: req.body.email }, function (errorEmail, someValue) {
        if (errorEmail) {
          return res.status(200).json({ error: 'Error to find email' });
        } else if (someValue) {
          return res.status(200).json({ error: 'Email que está tentando utilizar já está em uso.' });
        } else {
          req.body.password = md5Pass;
          var modelCreate = new UserModel(req.body);
          modelCreate.save(function (err, myModel) {
            if (err) {
              return res.status(500).send(err);
            }
            return res.status(200).json(myModel);
          });
        }
      });
    }

  });
};