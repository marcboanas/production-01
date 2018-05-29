// Modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const cors = require('cors');

// Config
const config = require('./server/config');

// Api
const app = express();
const port = process.env.PORT || 8083;
app.set('port', port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cors());

// Database configuration
mongoose.connect(config.MONGO_URI);

if (process.env.NODE_ENV === 'dev') {
	mongoose.set('debug', true);
}

// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));

// Set static path to Angular app to dist
// Don't run in dev
if (process.env.NODE_ENV !== 'dev') {
	app.use('/', express.static(path.join(__dirname, './dist')));
}

// Routes ----------------------------------

require('./server/api')(app, config);

// Pass routing to Angular app
// Don't run in dev
if (process.env.NODE_ENV !== 'dev') {
	app.get('*', function(req, res) {
		res.sendFile(path.join(__dirname, '/dist/index.html'));
	});
}

// Start the app by listening on the default
// Heroku port
app.listen(port, () => {
	console.log(`server is listening on port ${port}`);
});