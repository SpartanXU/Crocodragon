/**
 * Created by xujingwei on 9/14/16.
 */

module.exports = function (app) {
    var index = require('../controllers/index.server.controller');
    app.get('/', index.render);
};