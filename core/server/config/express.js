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

    //determine environment
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }

    //necessary middleware
    app.use(bodyParser.urlencoded({
        extended: true,
        limit: '10mb'
    }));
    app.use(bodyParser.json({limit: '10mb'}));
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
    require('../routes/usersManagement.server.routes') (app);
    require('../../../wallet/server/routes/wallet.server.routes')(app);

    //serve static files, place below the routing command for faster response
    app.use(express.static('./core/client'));
    app.use(express.static('./wallet/client'));
    return app;
};