var express 	 = require('express');
var path         = require('path');
var logger       = require('morgan');
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');
var useragent    = require('express-useragent');
var ejs 		 = require('ejs');

var routes       = require('./config/routes');

//var orm = require('orm');
var app = express();

app.use(logger('dev'));
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('html',ejs.__express);
//app.set("view engine", "ejs");
app.set('view engine', 'html');
app.set("view options", {"layout": false});
app.use(cookieParser());
app.use(useragent.express());

routes(app);

module.exports = app;