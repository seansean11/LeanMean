(function() {
	'use strict';

	angular
		.module('leanMean.components.main')
		.config(config);

	config.$inject = ['$stateProvider'];
	
	function config($stateProvider) {
		$stateProvider
			.state('main', {
				url: '/',
				templateUrl:'views/main.html',
				controller: 'MainCtrl',
				controllerAs: 'vm'
			});  
	}

})();
