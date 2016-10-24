var db = require('../db_config.js');

exports.list = function(callback) {
    db.TransporterInfo.find({}, function(error, menus) {
       if(error) {
            callback({error: 'Error to load menus'});
        } else {
            callback(menus);
        }
    });
};

exports.menu = function(id, callback) {
	db.TransporterInfo.findById(id, function(error, menu) {
       if(error) {
            callback({error: 'Error to load menu'});
        } else {
            callback(menu);
        }
       
    });
};

exports.save = function(model, typeTruck, days, schedules, callback) {
	new db.TransporterInfo({
        'model': model,
        'typeTruck': typeTruck,
        'days': days,
        'schedules': schedules
    }).save(function(error, menu){
        if(error) {
            callback({
                    msg: 'Error to save TransporterInfo, please check json info and try again',
                    error: error
                });
        } else {
            callback(menu);
        }
    });
};

exports.update = function(name, categories, callback) {
	db.TransporterInfo.findById(id, function(error, menu) {
        if(name) {
            menu.name = name;
        }
        if(categories) {
            menu.categories = categories;
        }
        menu.save(function(error, menu){
            if(error) {
                callback({error: 'Error to upload menu'});
            } else {
                callback(menu);
            }
        });

    });
};

exports.delete = function(id, callback) {

    db.TransporterInfo.findById(id, function(error, menu) {
       if(error) {
            callback({error: 'Error to load menu'});
        } else {
            menu.remove(function(error) {
                if(!error) {
                    callback('TransporterInfo deleted with success');
                }
            });
        }
    });
};