// Invoke 'strict' JavaScript mode
'use strict';

// Configure the 'example' module routes
angular.module('mail').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/mail', {
			templateUrl : 'mail/views/mail.client.view.html'
		}).
		otherwise({
			redirectTo: '/'
		});
	}
]);
