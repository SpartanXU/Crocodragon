/**
 * Navigation bar controller
 */

angular.module('navbar').controller('NavbarController',
['$scope','Authentication','$location', function ($scope, Authentication, $location) {
    $scope.authentication = Authentication;
    if (!Authentication) {
        $scope.account = "icon-user-plus";
    } else {
        $scope.account = Authentication.
    }
}
])