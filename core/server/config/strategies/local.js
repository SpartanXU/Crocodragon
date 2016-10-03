/**
 * Created by xujingwei on 9/17/16.
 */

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('mongoose').model('User');

module.exports = function () {
    passport.use(new LocalStrategy(function (username, password, done) {
        User.findOne({
            username: username
        }, function (err, user) {
            //error check
            if (err) {
                return done(err);
            }
            //if the user can be found
            if (!user) {
                return done(null, false, {
                    message: 'Unknow user'
                });
            }
            //if the password is correct
            if (!user.authenticate(password)) {
                return done(null, false, {
                    message: 'Invalid password'
                });
            }
            return done(null, user);
        });
    }));
};