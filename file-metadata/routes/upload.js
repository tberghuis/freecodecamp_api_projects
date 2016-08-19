var express = require('express')
var multer = require('multer')
var path = require("path")

//
//console.log(`${__dirname}/../uploads/`);

var upload = multer({ dest: path.join(__dirname,'..','uploads') })


module.exports = function (app) {
    app.post('/upload', upload.single('userFile'), function (req, res, next) {
        // req.file is the `avatar` file
        // req.body will hold the text fields, if there were any

        console.log(req.body);


        res.send('file uploaded');
    });
}

