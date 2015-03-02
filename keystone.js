// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();
// Require keystone
var keystone = require('keystone');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({

	'name': 'kstone',
	'brand': 'kstone',
	
	'less': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'jade',
	
	'emails': 'templates/emails',
	
	'auto update': true,
	'mongo': 'mongodb://admin:admin21@ds045057.mongolab.com:45057/kstone',
	'session': true,
	'auth': true,
	'user model': 'Y',
	'cookie secret': 'k,Kz9ipe=nnaJbr)k-7-#m6m%VB-^,}^-Fi]gvWeAtzfta$%XZ>L@>1}F=`e(ySN'

});

// Load your project's Models

keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js

keystone.set('locals', {
	_: require('underscore'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable
});

// Load your project's Routes

keystone.set('routes', require('./routes'));

// Setup common locals for your emails. The following are required by Keystone's
// default email templates, you may remove them if you're using your own.

keystone.set('email locals', {
	logo_src: '/images/logo-email.gif',
	logo_width: 194,
	logo_height: 76,
	theme: {
		email_bg: '#f9f9f9',
		link_color: '#2697de',
		buttons: {
			color: '#fff',
			background_color: '#2697de',
			border_color: '#1a7cb7'
		}
	}
});

// Setup replacement rules for emails, to automate the handling of differences
// between development a production.

// Be sure to update this rule to include your site's actual domain, and add
// other rules your email templates require.
keystone.set('email rules', [{
	find: '/images/',
	replace: (keystone.get('env') == 'production') ? 'https://dry-bayou-9183.herokuapp.com//images/' : 'http://localhost:3000/images/'
}, {
	find: '/keystone/',
	replace: (keystone.get('env') == 'production') ? 'https://dry-bayou-9183.herokuapp.com//keystone/' : 'http://localhost:3000/keystone/'
}]);

keystone.set('cloudinary config', { cloud_name: 'dw2jydsth', api_key: '125365349496167', api_secret: 'ZyDGAgMqBEQD8RBsCm7bCp8PSAQ' });

// Load your project's email test routes

keystone.set('email tests', require('./routes/emails'));

// Configure the navigation bar in Keystone's Admin UI

keystone.set('nav', {
	'posts': ['posts', 'post-categories'],
	'galleries': 'galleries',
	'enquiries': 'enquiries',
	'ys': 'ys'
});

// Start Keystone to connect to your database and initialise the web server

keystone.start();
