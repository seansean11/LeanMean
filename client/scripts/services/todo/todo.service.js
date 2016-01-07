(function() {
  'use strict';

  angular
    .module('leanMean.services.todo')
  	.factory('Todo', Todo);

  Todo.$inject = ['$resource'];

  function Todo($resource){
    return $resource('/api/todos/:id', { id: '@_id' }, {
      update: {
        method: 'PUT'
      }
    });
  }

})();
