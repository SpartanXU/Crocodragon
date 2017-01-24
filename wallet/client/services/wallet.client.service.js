/**
 * Wallet service for wallet CRUD module to communicate with the API endpoints.
 * Utilize the $resource factory method
 */

angular.module('wallet').factory('Wallet', ['$resource',
    function ($resource) {
        //base url for resource endpoints
        //routing parameter assignment using the wallet's document _id field
        return $resource('/api/wallet/:walletId', {      
            walletId: '@_id' 
        }, {
            update: {
                method: 'PUT'
            }
        });
}]);