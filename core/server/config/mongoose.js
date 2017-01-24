/**
 * Created by xujingwei on 9/17/16.
 */

var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function () {
    var db = mongoose.connect(config.db);  //connect to database using the db url

    require('../models/usersManagement.server.model');
    require('../../../wallet/server/models/wallet.server.model');

    return db;
};