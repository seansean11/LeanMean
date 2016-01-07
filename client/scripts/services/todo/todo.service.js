(function() {
  'use strict';

  angular
    .module('leanMean')
  	.factory('Todo', Todo);

  Todo.$inject = ['$http'];

  function Todo($http){

    return $resource('/api/todos/:id', { id: '@_id' }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
