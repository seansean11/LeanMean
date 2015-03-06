'use strict';

angular.module('app')
  .controller('MainCtrl', ['$scope', 'Todo', function ($scope, Todo) {
    $scope.newTodo = new Todo();
    $scope.isEditing = null;

    // GET all todos
    var todos = $scope.todos = Todo.query();

    // DELETE todo
    $scope.deleteTodo = function(todo) {
      todo.$delete(function() {
        todos.splice(todos.indexOf(todo),1);
      });
    };

    // POST todos
    $scope.addTodo = function() {
      $scope.newTodo.user_id = '123213';
      $scope.newTodo.$save(function(data) {
        todos.push(data);
        $scope.newTodo = new Todo();
      });
    };

    // PUT todo
    $scope.editTodo = function(todo) {
      $scope.isEditing = todo;
    };

    $scope.updateTodo = function(todo) {
      todo.$update(function() {
        $scope.isEditing = null;
      });
    };

  }]);
