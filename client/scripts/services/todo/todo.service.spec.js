describe('Todo Service', function() {
  var Todo,
      $httpBackend,
      todoData = {};

  beforeEach(module('leanMean'));
  beforeEach(inject(function(_Todo_, _$httpBackend_) {
    Todo = _Todo_;
    $httpBackend = _$httpBackend_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  })

  it('should create a todo', function() {
    
	});

  it('should get all todos', function() {
  
	});

  it('should update a todo', function() {

  });

  it('should delete a todo', function() {

  });
});
