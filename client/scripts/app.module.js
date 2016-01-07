'use strict';

/**
 * Main module of the application.
 */
angular
  .module('leanMean', [
		'leanMean.core',
		'leanMean.components'
  ]);
  .config(function ($urlRouterProvider, $locationProvider, $stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl:'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'vm'
      })
      .state('login', {
        url: '/login',
        templateUrl:'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'vm'
      });

    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
  });
