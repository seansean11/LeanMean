describe('Main Controller', function() {
	var $scope,
			$httpBackend,
			controller,
			Todo;
			

	beforeEach(module('leanMean.components.main'));
	beforeEach(inject(function(_$controller_, _$httpBackend_, _Todo_) {
		$scope = {};
		$httpBackend = _$httpBackend_,
		Todo = _Todo_
		controller = _$controller_('MainCtrl', {$scope: $scope});
	}));

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpecatation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	it('exists', function() {
		expect(controller).toBeDefined();
	});
});
