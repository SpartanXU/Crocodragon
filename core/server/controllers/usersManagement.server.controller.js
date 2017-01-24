

var User = require('mongoose').model('User'), //call the mongoose User model method at userManagement.server.model.js
    password = require('passport');

//return a unified error message from mongoose error object
var getErrorMessage = function (err) {
    var message = '';

    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'Username already exists';
                break;
            default:
                message = 'Something went wrong';
        }
    } else {
        for (var errName in err.errors) {
            if (err.errors[errName].message) message = err.errors[errName].message;
        }
    }

    return message;
};
//render the sign-in page
exports.renderSignin = function (req, res, next) {
    if (!req.user) {
        res.render('signin', {
            title: 'Sign-in Form',
            messages: req.flash('error') || req.flash('info')
        });
    } else {
        return res.redirect('/');
    }
};
//render sign-up page
exports.renderSignup = function (req, res, next) {
    if (!req.user) {
        res.render('signup', {
            title: 'Sign-up Form',
            messages: req.flash('error')
        });
    } else {
        return res.redirect('/');
    }
};

exports.signup = function (req, res, next) {
    if (!req.user) {
        var user = new User(req.body);
        var message = null;

        user.provider = 'local';

        user.save(function (err) {
            if (err) {
                var message = getErrorMessage(err);

                req.flash('error', message);
                return res.redirect('/signup');
            }
            req.login(user, function (err) {
                if(err) return next(err);
                return res.redirect('/');
            });
        });
    } else {
        return res.redirect('/');
    }
};

exports.signout = function (req, res) {
    req.logout();
    res.redirect('/');
};

//create new user
exports.create = function(req, res, next){
    var user = new User(req.body); //using new method to create a new model

    user.save(function (err) {
        if (err) {
            return next(err); //if fail then passing the error to next middleware
        } else {
            res.json(user); //save the user and output the user object
        }
    });
};

exports.list = function (req, res, next) {
    User.find({}, function (err, users) {
        if (err) {
            return next(err);
        } else {
            res.json(users);
        }
    });
};
////read an existing user document
exports.read = function (req, res) {
    res.json(req.user);
};
//manipulation of single document when performing read, delete and update operations
exports.userByID = function (req, res, next, id) {
    User.findOne({
        _id:id
    },function (err, user) {
        if(err) {
            return next(err);
        } else {
            req.user = user;
            next();
        }
    });
};
//update an existing user document
exports.update = function (req, res, next) {
    User.findByIdAndUpdate(req.user.id, req.body, function (err, user) {
        if(err){
            return next(err);
        } else {
            res.json(user);
        }
    });
};
//delete an existing user document
exports.delete = function (req, res, next) {
    req.user.remove(function (err) {
        if(err) {
            return next(err);
        } else {
            res.json(req.user);
        }
    })
};

exports.requiresLogin = function (req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).send({
            message: 'User is not logged in'
        });
    }

    next();
};