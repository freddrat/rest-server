var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var util = require('util');

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: true }))
 
// parse application/json 
app.use(bodyParser.json({extended: true}));

app.post('/EVENTS/:id', function(req,res,next) {
	console.log(util.inspect(req.body, false, null));
	//console.log(JSON.stringify(req.body,null,2));
	res.status(200).send("Server responding");
	next();
});

app.post('/configuration/:id', function(req, res, next) {
	//console.log('Id:'+req.params.id);
	res.contentType('text/html');
	res.send(200, '{id: '+req.params.id+'}');
	next();
});

app.get('*', function (req, res) {
  res.contentType('text/html');
  res.send(200, 'This is a simple rest-service for Intelligent Logger project');
});

app.listen(3000);
