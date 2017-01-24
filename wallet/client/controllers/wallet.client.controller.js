/**
 * Wallet controller to perform CRUD operations
 */

angular.module('wallet').controller('WalletController',
['$scope', '$routeParams', '$location', 'Authentication', 'Wallet',
    function ($scope, $routeParams, $location, Authentication, Wallet) {
        $scope.authentication = Authentication; //Authentication service to provide the authentication user infomation
        //image upload
        $scope.imageUpload = function(element){
            var reader = new FileReader();
            reader.onload = $scope.imageIsLoaded;
            reader.readAsDataURL(element.files[0]);
        };
        $scope.pic = "../img/avatar.png";
        //after image been uploaded, $scope.pic will be used to display image preview
        $scope.imageIsLoaded = function(e){
            $scope.$apply(function() {
                $scope.pic = e.target.result;
            });
        };

        //creating a wallet
        $scope.create = function () {
            //pass general data to the wallet
            var wallet = new Wallet({
                birthday: this.birthday,
                gender: this.gender,
                address: this.address,
                zip: this.zip
            });
            //avatar picture upload
            var imgUpload = document.getElementById('file').files[0],
                imgreader = new FileReader();
            //after upload, read the file as dataURL and save the wallet, finally redirect user to display the wallet
            imgreader.onloadend = function(e) {
                var data = e.target.result;
                wallet.avatar = data;
                //save the wallet and redirect user
                wallet.$save(function(response){
                    $location.path('/wallet/'+ response._id);
                }, function(errorResponse) {
                    $scope.error = errorResponse.data.message;
                });
            };
            if (imgUpload) {
                imgreader.readAsDataURL(imgUpload);
            } else {
                wallet.$save(function(response){
                    $location.path('/wallet/'+ response._id);
                }, function(errorResponse) {
                    $scope.error = errorResponse.data.message;
                });
            };
        };

        //retrieving a single wallet
        $scope.findOne = function() {
            $scope.wallet = Wallet.get({
                walletId: $routeParams.walletId
            });
        };

        //updating an existing article
        $scope.update = function() {
            $scope.wallet.$update(function(){
                $location.path('wallet/' + $scope.wallet._id);//update the wallet
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;//error message to the user
            });
        };

        //delete method to deleting an existing wallet
        $scope.delete = function(wallet) {
            $scope.wallet.$remove(function() {
                $location.path('wallet');
            });
        };

    }
]);