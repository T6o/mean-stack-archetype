// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var users = require('../../app/controllers/users.server.controller'),
map = require('../../app/controllers/map.server.controller');

// Define the routes module' method
module.exports = function(app) {
	// Set up the 'articles' base routes
	app.route('/api/mgeoartlist').post(users.requiresLogin,map.list);

};
