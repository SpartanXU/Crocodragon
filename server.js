/**
 * Created by xujingwei on 9/10/16.
 */

//environment setting
process.env.NODE_ENV = process.env.NODE_ENV || 'development';


var mongoose = require('./core/server/config/mongoose'), //set the mongoose config file
    express = require('./core/server/config/express'), //set the express config file
    passport = require('./core/server/config/passport'); //set the passport config file


var db = mongoose();
var app = express();
var passport = passport();


//run the server on port 3000
app.listen(3000);
module.exports = app;


console.log('Server running at http://localhost:3000/');

