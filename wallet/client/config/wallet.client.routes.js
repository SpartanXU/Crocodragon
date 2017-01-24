
angular.module('wallet').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/wallet/create', {
            templateUrl: '../views/create-wallet.client.view.html'
        }).
        when('/wallet/:walletId', {
            templateUrl: '../views/view-wallet.client.view.html'
        });
    }
]);