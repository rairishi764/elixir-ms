const express = require('express'),
cors = require('cors');
app = express(),
app.use(cors());

  bodyParser = require('body-parser');
  port = process.env.PORT || 3002;


app.listen(port);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
console.log('API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./app/Routes'); //importing route
routes(app); //register the route