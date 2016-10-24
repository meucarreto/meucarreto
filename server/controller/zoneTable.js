var db = require('../db_config.js');

exports.list = function(callback) {
    db.zoneTable.find({}, function(error, zones) {
       if(error) {
            callback({error: 'Error to load zones'});
        } else {
            callback(zones);
        }
    });
};


exports.save = function(name, cepInicial, cepFinal, callback) {
	new db.zoneTable({
        'name': name,
        'cepInicial': cepInicial,
        'cepFinal': cepFinal
    }).save(function(error, menu){
        if(error) {
            callback({
                    msg: 'Error to save zoneTable, please check json info and try again',
                    error: error
                });
        } else {
            callback(menu);
        }
    });
};

exports.delete = function(id, callback) {
    db.zoneTable.findById(id, function(error, zone) {
       if(error) {
            callback({error: 'Error to load zone'});
        } else {
            zone.remove(function(error) {
                if(!error) {
                    callback('zone deleted with success');
                }
            });
        }
    });
};