describe('Main Controller', function() {
	var $scope,
			$httpBackend,
			$q,
			$rootScope,
			controller,
			Todo,
			todos = mockData.getMockTodos();

	beforeEach(module('leanMean.components.main'));
	beforeEach(module('leanMean.services.todo'));

	beforeEach(inject(function(_$controller_, _$httpBackend_, _$q_, _$rootScope_, _Todo_) {
		$scope = {};
		$httpBackend = _$httpBackend_;
		$q = _$q_;
		$rootScope = _$rootScope_;
		Todo = _Todo_;
		
		controller = _$controller_('MainCtrl', { $scope: $scope });
	}));

	it('should exist', function() {
		expect(controller).toBeDefined();
	});

	it('should have empty todos before activation', function() {
		expect(controller.todos).toBeDefined();
	});

	it('should have todos after activation', function() {
		spyOn(Todo, 'query').and.callFake(function() {
			return $q.when(todos);
		});
		$rootScope.$apply();
		expect(controller.todos.length).toBeGreaterThan(0);
	});
});
