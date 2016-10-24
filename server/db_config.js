var db_string   = 'mongodb://127.0.0.1/meucarretodb';
var mongoose    = require('mongoose').connect(db_string);
var db          = mongoose.connection;

// Open webserver / database connection
db.on('error', console.error.bind(console, 'Error to connect db'));
db.once('open', function() {
    var transporterInfoSchema = mongoose.Schema({
        model : [],
        typeTruck: [],
        days: [],
        schedules: [],
        nf: Boolean,
        insurance: Boolean
    });

    var zoneTableSchema = mongoose.Schema({
        name : String,
        cepInicial: Number,
        cepFinal: Number
    });

    
    exports.TransporterInfo = mongoose.model('TransporterInfo', transporterInfoSchema);
    exports.zoneTable = mongoose.model('zoneTable', zoneTableSchema);
});