(function() {
  'use strict';

  angular
    .module('leanMean')
    .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$scope'];

  function LoginCtrl($scope) {
    var vm = this;
  }
})();