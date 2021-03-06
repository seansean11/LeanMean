(function() {
  'use strict';

  angular
    .module('leanMean.components.main')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$exceptionHandler', '$scope', 'Todo'];

  function MainCtrl($exceptionHandler, $scope, Todo) {
    var vm = this;
    var handleError = function(e) {
			$exceptionHandler(e.data);
    }

    vm.newTodo = new Todo();
    vm.isEditing = null;
		vm.todos = [];

    vm.editTodo = function(todo) {
      vm.isEditing = todo;
    };

    // GET all todos
		Todo.query(function(data) {
			vm.todos = data;		
		}, handleError);

    // DELETE todo
    vm.deleteTodo = function(todo) {
      todo.$delete(function() {
        vm.todos.splice(vm.todos.indexOf(todo),1);
      }, handleError);
    };

    // POST todos
    vm.addTodo = function() {
      vm.newTodo.user_id = '123213';
      vm.newTodo.$save(function(data) {
        vm.todos.push(data);
        vm.newTodo = new Todo();
      }, handleError);
    };

    // UPDATE todo
    vm.updateTodo = function(todo) {
      todo.$update(function() {
        vm.isEditing = null;
      }, handleError);
    };
  }

})();
