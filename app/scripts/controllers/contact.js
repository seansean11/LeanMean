'use strict';

/**
 * @ngdoc function
 * @name app.controller:ContactCtrl
 * @description
 * # ContactCtrl
 * Controller of the app
 */
angular.module('app')
  .controller('ContactCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });