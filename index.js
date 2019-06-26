require('dotenv').config();

var { isNumber, isString } = require('lodash');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var useragent = require('express-useragent');
var requestIp = require('request-ip');
var routes = require('./routes');
var mung = require('express-mung');
var { filterProperties } = require('./data/utils');
let indexingOfKeyword = require('./index/index')

app.set('view engine', 'ejs');


app.use(useragent.express());
app.use(requestIp.mw());
app.use(cors());

app.options("/*", cors());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

const PORT = process.env.PORT;


indexingOfKeyword()
  


//middleware to access response body object
app.use(mung.json(
  function transform(body, req, res) {
    if (isNumber(body)) {
      return res.json(body);
    }
    if (isString(body)) {
      return res.json(body);
    }
    // do something with body 
    if (req.user) {
      return filterProperties(body, (data) => false);
    }
    return filterProperties(body, (data) => {
      if (req.user && data.user && data.user._id) {
        return req.user.id !== String(data.user._id);
      } else if (req.user && data.user) {
        return req.user.id !== String(data.user);
      } else if (req.user && data._id) {
        return req.user.id !== String(data._id);
      }
      return true;
    });
  }
));




app.get('/', function (req, res, next) {
  res.json({ message: 'hello world application' });
});

// **************** Route definitions start from here *********************


app.post('/system', routes.system.post);

app.all('/login',routes.system.verify, routes.auth.login);

// user end points
app.post('/users',routes.system.verify,routes.user.post);


console.log(`listening on ${PORT}`);
app.listen(PORT);
module.exports = app;
