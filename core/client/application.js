/**
 * Created by xujingwei on 9/18/16.
 */

var mainApplicationModuleName = 'core';

var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngRoute','navbar','ngMaterial','users','ngResource','wallet']);

//Hashbangs configuration
mainApplicationModule.config(['$locationProvider',
    function ($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);

//angular object jqLite functionality to bind a function to the document-ready event
angular.element(document).ready(function () {
    angular.bootstrap(document, [mainApplicationModuleName]);
});