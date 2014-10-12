var express = require('express')
  , params = require('express-params')
  , http = require('http')
  , path = require('path')
  , config = require('./config');

var app = express();
params.extend(app);

// all environments
app.configure(function() {
  app.set('port', process.env.PORT || config.dev.port);
  app.set('host', process.env.HOST || config.dev.host);
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('stylus').middleware(path.join(__dirname, 'public')));
  app.use(express.static(path.join(__dirname, 'public')));
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//setup routes
require('./routes/index')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});