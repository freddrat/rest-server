var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var jsonParser = bodyParser.json();

app.post('/EVENTS/:id', jsonParser, function(req,res,next) {
	console.log(req.body);
	res.status(200).send(req.body);
	next();
});

app.get('/configuration/:id', function(req, res, next) {
	//console.log('Id:'+req.params.id);
	res.contentType('text/html');
	res.send(200, 'id: '+req.params.id+'}');
	next();
});

app.get('*', function (req, res) {
  res.contentType('text/html');
  res.send(200, 'This is a simple rest-service for Intelligent Logger project');
});

app.listen(3000);
