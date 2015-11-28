describe('Todo Service', function() {

  beforeEach(module('leanMean'));
  beforeEach(inject(function(_Todo_, _$httpBackend_) {
    Todo = _Todo_;
    $httpBackend = _$httpBackend_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  })

  // it('should create a todo', function() {
    // $httpBackend.expectPOST(/./, function(data) {
    //   // dump(data);
    // });
  // });
});