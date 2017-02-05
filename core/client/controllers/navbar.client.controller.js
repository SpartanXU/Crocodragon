/**
 * Navigation bar controller
 */

angular.module('navbar').controller('NavbarController',
['$scope','Authentication','$location', function ($scope, Authentication, $location) {
    $scope.authentication = Authentication;
    $scope.go = function (path) {
        if ( path == "/wallet") {
            console.log(Authentication.user);
            path = path + "/" + Authentication.user._id;
        }
        $location.path(path);
    }
/**
 *  if (!Authentication) {
 *      $scope.account = "icon-user-plus";
 *  } else {
 *      $scope.account = Authentication.user
 *  }
 */
}])