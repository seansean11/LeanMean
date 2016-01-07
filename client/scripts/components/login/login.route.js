(function() {
	'use strict';

	angular
		.module('leanMean.components.login')
		.config(config);

	config.$inject = ['$stateProvider'];

	function config($stateProvider) {
		$stateProvider
			.state('login', {
        url: '/login',
        templateUrl:'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'vm'
      });:w
	}
})();
