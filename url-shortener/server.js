// third party
var validUrl = require('valid-url');
var Url = require('./model/url');

// config
var mongoUri = 'mongodb://localhost/url-shortener';
var mongoOptions = {db: {safe: true}};
var port =8000;
var baseUrl = `http://localhost:${port}/`;

var mongoose = require('mongoose');

mongoose.Promise = Promise;

mongoose.connect(mongoUri, mongoOptions);
mongoose.connection.on('error', function(err) {
        console.error('MongoDB connection error: ' + err);
        process.exit(-1);
    }
);

var express = require('express');
var app = express();
app.set('port', port);

app.get('/new/*', function(req, res) {
    var original = req.url.replace('/new/', '');
    if (!validUrl.isWebUri(original)) {
        return res.json({error: "URL invalid"});
    }
    Url.create({original_url: original}, function(err, created) {
        if (err) return res.status(500).send(err);
        res.json({
            original_url: created.original_url,
            short_url: baseUrl + created.short_id
        });
    });
});

app.get('/*', function(req, res) {
    Url.findOne({short_id: req.url.slice(1)}).exec().then(function(found) {
        if (found) {
            res.redirect(found.original_url);
        } else {
            res.send({error: "No short url found for given input"});
        }
    });
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
