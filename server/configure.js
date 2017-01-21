//Wang Jian
//CSE270E
//2017 Jan 13
//Assignment10
var path = require('path'),
    routes = require('./routes'),
    exphbs = require('express-handlebars'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    morgan = require('morgan'),
    methodOverride = require('method-override'),
    errorHandler = require('errorhandler'),
    moment = require('moment'),
    multer = require('multer'),
    session = require('express-session');
module.exports = function(app) {
app.use(morgan('dev'));
  app.use(bodyParser.urlencoded());
  app.use(multer({ dest: path.join(__dirname, 'public/upload/temp')}).any());
  app.use(methodOverride());
  app.use(cookieParser('some-secret-value-here'));
  app.use(session({secret:"wangj37"}));
  app.engine('handlebars', exphbs.create({
      defaultLayout: 'timer',
      layoutsDir: app.get('views') + '/layouts',
      partialsDir: [app.get('views') + '/partials'],
      helpers: {
        timeago: function(timestamp) {
            return moment(timestamp).startOf('minute').fromNow();
        }
    }
  }).engine);
  app.set('view engine', 'handlebars');

  routes(app);
  app.use('/public/', express.static(path.join(__dirname, '../public')));

if ('development' === app.get('env')) {
   app.use(errorHandler());
}
    return app;
};
