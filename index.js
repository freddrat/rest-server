var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var util = require('util');
var helpers = require("./helpers.js");

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: true }))
 
// parse application/json 
app.use(bodyParser.json({extended: true}));

app.post('/EVENTS/:id', function(req,res,next) {
	console.log(util.inspect(req.body, false, null));
	res.status(200).send("Server responding");
	next();
});

app.post('/CONFIG/:id', function(req, res, next) {
	//console.log(util.inspect(req.body.configHash, false, null));
	var confFileChecksum = helpers.getConfigFileChecksum(req.params.id);
	if(confFileChecksum == -1) {
		res.status(200).send('Error when retrieving checkum from configuration file for id: '+req.params.id);
	}
	
	var isEqualChecksum = helpers.compareChecksums(req.body.configHash, confFileChecksum);
	
	console.log('Given Hash: '+req.body.configHash, 'Config File Hash: '+confFileChecksum, 'isEqualChecksum: '+isEqualChecksum);
	if(isEqualChecksum) {
		res.status(200).send('Hash valid');
	} else {
		res.status(200).send('Invalid hash => Please update your configuration...');
	}
	next();
});

app.get('/CONFIG/:id', function(req, res, next) {
	console.log(req.query.configHash);
	//console.log(util.inspect(req.body.configHash, false, null));
	
	var confFileChecksum = helpers.getConfigFileChecksum(req.params.id);
	if(confFileChecksum == -1) {
		res.status(200).send('Error when retrieving checkum from configuration file for id: '+req.params.id);
	} else {
		var isEqualChecksum = helpers.compareChecksums(req.query.configHash, confFileChecksum);
		
		console.log('Given Hash: '+req.query.configHash, 'Config File Hash: '+confFileChecksum, 'isEqualChecksum: '+isEqualChecksum);
		if(isEqualChecksum) {
			res.status(200).send('Hash valid');
		} else {
			var content = helpers.getConfigFileContent(req.params.id);
			console.log(content);
			res.status(200).json(content);
		}
		//next();
	}
});

app.get('*', function (req, res) {
  res.contentType('text/html');
  res.send(200, 'This is a simple rest-service for Intelligent Logger project');
});

app.listen(3000);


