// Invoke 'strict' JavaScript mode
'use strict';

// Configure the 'example' module routes
angular.module('signup').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/signup', {
			templateUrl: 'signup/views/signup.client.view.html'
		}).
		otherwise({
			redirectTo: '/'
		});
	}
]);
