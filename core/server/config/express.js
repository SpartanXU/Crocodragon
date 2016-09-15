/**
 * Created by xujingwei on 9/14/16.
 */

var express = require('express'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');

module.exports = function () {
    //create the application
    var app = express();

    //determine which environment using if/else statement
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }

    //add necessary middleware
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    app.set('views', './core/server/views');
    app.set('view engine', 'ejs');

    require('../routes/index.server.routes') (app);
    return app;
};