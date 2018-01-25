// Invoke 'strict' JavaScript mode
'use strict';

// Set the 'development' environment configuration object
module.exports = {

	db: 'mongodb://localhost/Mymean1',
	sessionSecret: 'developmentSessionSecret',
	sgMail: '',

	facebook: {
		clientID: '',
		clientSecret: '',
		callbackURL: 'http://localhost:3000/oauth/facebook/callback'
		//callbackURL: 'http://localhost:3000/'
	},
	twitter: {
		clientID: '',
		clientSecret: '',
		callbackURL: ''
	},
	google: {
		clientID: '',
		clientSecret: '',
		callbackURL: ''
	}

};
