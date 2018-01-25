// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'example' controller
angular.module('signin').controller('ExampleController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// Expose the authentication service
		$scope.authentication = Authentication;
	}
]);
