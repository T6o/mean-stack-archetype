// Invoke 'strict' JavaScript mode
'use strict';

// Configure the 'example' module routes
angular.module('signin').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/signin', {
			templateUrl: 'signin/views/signin.client.view.html'
		}).
		otherwise({
			redirectTo: '/'
		});
	}
]);
