const express = require('express');
const bodyParser     = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

var http = require('http').Server(app); 
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) );
app.all("/*", function(req, res, next){
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization,   Content-Length, X-Requested-With');
	next();
});

require('./app/routes')(app, {});


app.listen(port, () => console.log(`Listening on port ${port}`));