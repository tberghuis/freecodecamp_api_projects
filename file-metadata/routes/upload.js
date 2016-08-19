var express = require('express')
var multer = require('multer')
var upload = multer({ dest: '../uploads/' })


module.exports = function (app) {
    app.post('/upload', upload.single('userFile'), function (req, res, next) {
        // req.file is the `avatar` file
        // req.body will hold the text fields, if there were any

        console.log(req.body);


        res.send('file uploaded');
    });
}

