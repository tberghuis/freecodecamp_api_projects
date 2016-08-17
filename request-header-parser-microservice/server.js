var express = require('express');
var app = express();

app.get('/', function(req, res) {

	res.json({
		ipaddress: req.headers['x-forwarded-for'] ||
		req.connection.remoteAddress,
		language: req.headers["accept-language"].split(",")[0],
		software: req.headers["user-agent"].match(/\((.*?)\)/)[1]
	});
});

app.listen(8000, function() {
	console.log('Node app is running on port 8000');
});
