describe('Todo Service', function() {
  var Todo,
      $httpBackend,
			todo

  beforeEach(module('leanMean.services.todo'));
  beforeEach(inject(function(_Todo_, _$httpBackend_) {
    Todo = _Todo_;
    $httpBackend = _$httpBackend_;
		todo = new Todo();
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  })

	it('exists', function() {
		expect(Todo).toBeDefined();
	});

  it('should create a todo', function() {
		var expectedData = {"todo":"This is a todo!","user_id":"12"}; 
		
		$httpBackend.expect('POST', '/api/todos', expectedData)
			.respond(201);

		var newTodo = new Todo({
			todo: "This is a todo!", 
			user_id: "12"
		});

		newTodo.$save();

		expect($httpBackend.flush).not.toThrow();
	});
	
	it('should get todos', function() {
		$httpBackend.expect('GET', '/api/todos')
			.respond(200);

		Todo.query();

		expect($httpBackend.flush).not.toThrow();
	});

  it('should update a todo', function() {
		$httpBackend.expectPUT('/api/todos/12')
			.respond(200);

		todo.$update({id: '12'});

		expect($httpBackend.flush).not.toThrow();
  });

  it('should delete a todo', function() {
		$httpBackend.expectDELETE('/api/todos/12')
			.respond(200);

		todo.$delete({id: '12'});

		expect($httpBackend.flush).not.toThrow();
  });
});
