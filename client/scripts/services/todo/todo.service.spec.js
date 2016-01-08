describe('Todo Service', function() {
  var Todo,
      $httpBackend,

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
		
		$httpBackend.expectPOST('/api/todos', expectedData)
			.respond(201);

		var todo = new Todo({
			todo: "This is a todo!", 
			user_id: "12"
		});

		todo.$save();

		expect($httpBackend.flush).not.toThrow();
	});
	
	it('should get todos', function() {
		$httpBackend.expectGET('/api/todos')
			.respond('200');

		Todo.get();

		expect($httpBackend.flush).not.toThrow();
	});

  it('should update a todo', function() {
		$httpBackend.expectPUT('/api/todos/12')
			.respond('200');

		Todo.$update({id: '12'});

		expect($httpBackend.flush).not.toThrow();
  });

  it('should delete a todo', function() {
		$httpBackend.expectDELETE('/api/todos/12')
			.respond('200');

		Todo
  });
});
