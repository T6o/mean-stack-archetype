// Invoke 'strict' JavaScript mode
'use strict';

// Set the 'test' environment configuration object
module.exports = {
	db: 'mongodb://localhost/myprog-test',
	sessionSecret: 'testSessionSecret',
	sgMail: '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',

	facebook: {
		clientID: 'Facebook Application ID',
		clientSecret: 'Facebook Application Secret',
		callbackURL: 'http://localhost:3000/oauth/facebook/callback'
	},
	twitter: {
		clientID: 'Twitter Application ID',
		clientSecret: 'Twitter Application Secret',
		callbackURL: 'http://localhost:3000/oauth/twitter/callback'
	},
	google: {
		clientID: 'Google Application ID',
		clientSecret: 'Google Application Secret',
		callbackURL: 'http://localhost:3000/oauth/google/callback'
	}
};
