const config = require("../config");
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(config.get('mongoose:uri'));
db = mongoose.connection;
db.once('open', function () {
     console.log('connection OK');
});
db.on('error', function () {
    console.error('error disconnect');
});
module.exports.db = db;
module.exports.mongoose = mongoose;
module.exports.User = require('./models/user');
module.exports.Film = require('./models/film');