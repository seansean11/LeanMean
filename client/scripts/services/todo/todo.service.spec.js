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
    var expectedData = {"user_id":"123213","todo":"test"};

    $httpBackend.expectPOST(/./, {"user_id":"123213","todo":"test"})
      .respond(201);

    var todo = new Todo({
      user_id: '123213',
      todo: 'test'
    });

    todo.$save();

    expect($httpBackend.flush).not.toThrow();
  });

  it('should get all todos', function() {
    $httpBackend.expectGET('/api/todos', function(data) {
      dump(data);
      return true;
    }).respond(200);

    dump(Todo.query());
  });

  it('should update a todo', function() {

  });

  it('should delete a todo', function() {

  });
});