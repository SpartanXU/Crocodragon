/**
 * Created by xujingwei on 9/10/16.
 */

//environment setting
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//set the express config file
var express = require('./core/server/config/express');
var app = express();

//run the server on port 3000
app.listen(3000);
module.exports = app;


console.log('Server running at http://localhost:3000/');

