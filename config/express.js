// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var config = require('./config'),
  http = require('http'),
  socketio = require('socket.io'),
  express = require('express'),
  morgan = require('morgan'),
  compress = require('compression'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  session = require('express-session'),
  MongoStore = require('connect-mongodb-session')(session),
  flash = require('connect-flash'),
  passport = require('passport'),
  nodemailer = require('nodemailer');


// Define the Express configuration method
module.exports = function(db) {
  // Create a new Express application instance
  var app = express();
  var server = http.createServer(app);
  var io = socketio.listen(server);

  io.on('connection', function(socket) {
    socket.on('disconnect', function() {
      console.log('user has disconnected');
    });
  });

  io.use(function(socket, next) {
    /* ... */
    next(null, true);
  });

  // Use the 'NDOE_ENV' variable to activate the 'morgan' logger or 'compress' middleware
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production') {
    app.use(compress());
  }

  // Use the 'body-parser' and 'method-override' middleware functions
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(methodOverride());

  var store = new MongoStore({
    db: db
  });

  app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: config.sessionSecret,
    store: store,
  }));

  // Set the application view engine and 'views' folder
  app.set('views', './app/views');
  app.set('view engine', 'ejs');

  // Configure the flash messages middleware
  app.use(flash());

  // Configure the Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());

  // Load the routing files
  require('../app/routes/index.server.routes.js')(app);
  require('../app/routes/users.server.routes.js')(app);
  require('../app/routes/articles.server.routes.js')(app);
  require('../app/routes/mail.server.routes.js')(app);
  require('../app/routes/map.server.routes.js')(app);
  require('./socketio')(server, io, store);

  // Configure static file serving
  app.use(express.static('./public'));

  // Return the Express application instance
  return server;

};
