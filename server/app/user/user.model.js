'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    "name": {
        type: String
    },
    "email": {
        type: String,
        unique: true
    },
    "login": {
        type: String,
        unique: true
    },
    "phone": {
        type: String
    },
    "password": {
        type: String
    },
    "isUser": {
        type: Boolean
    },
    "isTransporter": {
        type: Boolean
    },
    "nf": {
        type: Boolean
    },
    "security": {
        type: Boolean
    },
    "models": {
        type: Array
    },
    "typeTruck": {
        type: Array
    },
    "days": {
        type: Array
    },
    "schedules": {
        type: Array
    },
    "zone": {
        type: Array
    }
});




module.exports = mongoose.model('User', UserSchema);