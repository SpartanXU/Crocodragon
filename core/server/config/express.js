/**
 * Created by xujingwei on 9/14/16.
 */

var config = require('./config'),
    express = require('express'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    methodOverride = require('method-override'),
    flash = require('connect-flash'),
    passport = require('passport');

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

    //express.session middleware
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));

    //set the view at '/core/server/views' folder
    app.set('views', './core/server/views');
    app.set('view engine', 'ejs'); //set the template view with ejs engine

    //flash module to store temporary messages in an area of session object called flash
    app.use(flash());
    //passport middleware
    app.use(passport.initialize());
    app.use(passport.session());

    //set the route file
    require('../routes/index.server.routes') (app);
    require('../../../userManagement/server/routes/userManagement.server.routes') (app);

    //serve static files, place below the routing command for faster response
    app.use(express.static('core/client'));
    return app;
};