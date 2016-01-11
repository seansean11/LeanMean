describe('Main Controller', function() {
	var $exceptionHandler,
			$scope,
			$httpBackend,
			$q,
			$rootScope,
			controller,
			Todo,
			todos = mockData.getMockTodos(),
			todo;

	beforeEach(module('leanMean.components.main'));
	beforeEach(module('leanMean.services.todo'));
	beforeEach(module(function($exceptionHandlerProvider) {
		$exceptionHandlerProvider.mode('log');
	}));

	beforeEach(inject(function(_$exceptionHandler_, _$controller_, _$httpBackend_, _$q_, _$rootScope_, _Todo_) {
		$exceptionHandler = _$exceptionHandler_;
		$scope = {};
		$httpBackend = _$httpBackend_;
		$q = _$q_;
		$rootScope = _$rootScope_;
		Todo = _Todo_;
		
		todos = todos.map(function(todo) {
			return new Todo(todo);
		});
		controller = _$controller_('MainCtrl', { $scope: $scope });
	}));

	it('should exist', function() {
		expect(controller).toBeDefined();
	});

	it('should have empty todos before activation', function() {
		expect(controller.todos).toEqual([]);
	});

	describe('after activation', function() { 
		it('should have todos', function() {
			$httpBackend.expect('GET', '/api/todos')
				.respond(200, todos);

			$httpBackend.flush();
			expect(controller.todos.length).toBeGreaterThan(0);
		});

		it('should log error if query fails', function() {
			$httpBackend.expect('GET', '/api/todos')
				.respond(500, "test error");
			
			$httpBackend.flush();
			expect($exceptionHandler.errors).toEqual(['test error']);
		});

		it('should delete a todo', function() {	
			$httpBackend.expect('DELETE')
			controller.todos = todos;
			
			controller.deleteTodo(controller.todos[0]);
			$rootScope.$apply();
			expect(controller.todos.length).toEqual(todos.length - 1);
		});
		
		it('should create a new todo', function() {
			controller.todos = todos;
			controller.newTodo = new Todo();
			controller.newTodo.todo = 'hello world';

			controller.addTodo();
			expect(controller.todos.length).toEqual(todos.length + 1);
		});

		it('should update a todo', function() {
			controller.todos = todos;
			
			controller.updateTodo(controller.todos)
			expect(controller.todos[0].todo).toEqual('updated');
		});
  });
});
