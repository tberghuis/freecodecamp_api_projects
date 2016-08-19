var express = require('express');
var app = express();
var upload = require('./routes/upload.js');

// finish this app later... after the earier
// ones


/*
app.get('/', function (req, res) {
  res.send('Hello World!');
});
*/
app.use(express.static('public'));
upload(app);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
