var crypto = require('crypto');
var fs = require('fs');
var jsonFile = require('jsonfile');

module.exports = {
	compareChecksums : function(cs1, cs2) {
		return cs1 == cs2;
	},

	getConfigFileChecksum : function(id) {
		var checkSum = -1;
		try {
			var content = fs.readFileSync('configFiles/'+id+'-config.json');
			checkSum = crypto.createHash('md5').update(content, 'utf8').digest('hex');
			console.log(checkSum);
		} catch(e) {
			console.log('Error when reading configuration for id:'+id+'; Details: ' + e);
		}
		return checkSum;
	},
	
	getConfigFileContent : function(id) {
		var content = '';
		try {
			content = jsonFile.readFileSync('configFiles/'+id+'-config.json');
			console.log('Content:' + content);
		} catch(e) {
			console.log('Error while getting Configuration file contents for id:'+id+'; Details: ' + e);
		}
		
		return content;
	}
}