var express = require('express');
var path = require('path');
var ejs = require('ejs');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var mongoStore = require('connect-mongo')(session);
var logger = require('morgan');
var routes = require('./routes/index');
var port = process.env.PORT || 3000;
var dbUrl = 'mongodb://localhost:27017/bookstore';

var app = express();
mongoose.connect(dbUrl);

app.set('port', port);
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'ejs');
app.use(cookieParser());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());
app.use(session({
  secret: 'bookstore',
  store: new mongoStore({
    url: dbUrl,
    collection: 'sessions'
  }),
  resave: false,
  saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// development
if('development' == app.get('env')) {
  app.use(logger(':method :url :status'));
}

app.use('/', routes);

app.listen(port);
console.log('bookstore is listening on port ' + port);
