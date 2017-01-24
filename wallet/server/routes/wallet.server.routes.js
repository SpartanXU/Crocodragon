/**
 * wallet route
 */

var users = require('../../../core/server/controllers/usersManagement.server.controller'),
    wallet = require('../controllers/wallet.server.controller');

module.exports = function(app) {

    //wallet create page
    app.route('/api/wallet')
        .post(users.requiresLogin, wallet.create); //require user login to create wallet

    //individual wallet page, require authorization and login all the time
    app.route('/api/wallet/:walletId')
        .get(users.requiresLogin, wallet.hasAuthorization, wallet.read) //get method to read wallet info
        .put(users.requiresLogin, wallet.hasAuthorization, wallet.update) //put method update wallet
        .delete(users.requiresLogin, wallet.hasAuthorization, wallet.delete);//delete method to delete a wallet

    //make sure every route has the walletId parameter
    app.param('walletId', wallet.walletByID);
};