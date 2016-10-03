/**
 * Created by xujingwei on 8/7/16.
 */

var users = require('../controllers/usersManagement.server.controller'),
    passport = require('passport');

module.exports = function (app) {
    app.route('/signup')
        .get(users.renderSignup)
        .post(users.signup);
    app.route('/signin')
        .get(users.renderSignin)
        .post(passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/signin',
            failureFlash: true
        }));
    app.get('/signout', users.signout);
    //multiple user document
    app.route('/users')
        .post(users.create)
        .get(users.list);
    //single user document
    app.route('/users/:userId')
        .get(users.read)
        .put(users.update)
        .delete(users.delete);
    //define a middleware registered with userID method and executed before any other middleware
    app.param('userId', users.userByID);
};
