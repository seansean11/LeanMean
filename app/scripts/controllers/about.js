'use strict';

/**
 * @ngdoc function
 * @name deletemeApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the deletemeApp
 */
angular.module('deletemeApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
