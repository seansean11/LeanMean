var mockData = (function() {

	return {
			getMockTodos: getMockTodos
	};

	function getMockTodos() {
		return [
			{
				"_id":"569017048fe565ea639f05aa",
				"todo":"This is a first todo!",
				"user_id":123213,
				"__v":0,
				"at":"2016-01-08T18:18:07.653Z"
			},
			{
				"_id":"5690170a8fe565ea639f05ab",
				"todo":"This is another todo!",
				"user_id":123213,
				"__v":0,
				"at":"2016-01-08T18:18:07.653Z"
			},
			{
				"_id":"5690170f8fe565ea639f05ac",
				"todo":"Here's another!",
				"user_id":123213,
				"__v":0,
				"at":"2016-01-08T18:18:07.653Z"
			},
			{
				"_id":"569017168fe565ea639f05ad",
				"todo":"Today is Friday!",
				"user_id":123213,
				"__v":0,
				"at":"2016-01-08T18:18:07.653Z"
			}
		];
	}

})();
