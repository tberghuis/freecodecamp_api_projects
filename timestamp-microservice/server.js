var express    = require('express');
var app        = express();
var moment = require('moment');
const path = require('path');

app.use(express.static(path.resolve(__dirname, 'public')));


app.get('/:query', (req,res) => {
	var date;
	if(Number(req.params.query)){
		date = moment(req.params.query, "X");
	} else {
		date = moment(req.params.query, "MMMM D, YYYY");
	} 

	if(date.isValid()) {
		res.json({
			unix: date.format("X"),
			natural: date.format("MMMM D, YYYY")
		});
	} else {
		res.json({
			unix: null,
			natural: null
		});
	}
});


app.listen(8000, function() {
	console.log('Node.js listening on port 8000');
});
