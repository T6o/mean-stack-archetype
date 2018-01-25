// Invoke 'strict' JavaScript mode
'use strict';

// Configure the 'articles' module routes
angular.module('map').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/map', {
			templateUrl: 'map/views/map.client.view.html'
		})
	}
]);
