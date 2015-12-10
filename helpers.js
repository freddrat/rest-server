var crypto = require('crypto');
var fs = require('fs');

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
	}
}