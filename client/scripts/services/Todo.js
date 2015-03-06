'use strict';

angular.module('app')
	.factory('Todo', ['$resource', function($resource){
    return $resource('/api/todos/:id', { id: '@_id' }, {
      update: {
        method: 'PUT'
      }
    });
  }]);