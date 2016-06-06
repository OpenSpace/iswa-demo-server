"use strict";
var express = require('express');
var fs = require('fs');
var path = require('path');
var url = require('url');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var index = require('./index.js');

var app = express();

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));

var options = {
	root: __dirname + '/public/'
};

// ID API
// ======
app.get('/:id(\\d+)/', function (req, res) {
	res.sendFile( path.join(index.meta[req.params.id], "info.json"), options);
});

app.get('/image/:id/:date', function (req, res) {
	let cygnetDir = index.image[req.params.id];
	req.file = getFileName(cygnetDir, req.params.date);
	res.sendFile( path.join(cygnetDir, req.file), options);
});

app.get('/data/:id/:date', function (req, res) {
	let cygnetDir = index.data[req.params.id];
	req.file = getFileName(index.data[req.params.id], req.params.date);
	res.sendFile( path.join(cygnetDir, req.file), options);
});


// Images
// ======
app.get('/gm/images/x0/:date', attachFileName, function (req, res) {
	let cygnetDir = path.dirname(req.route.path);
	res.sendFile(path.join(cygnetDir, req.file), options);
});

app.get('/gm/images/y0/:date', attachFileName, function (req, res) {
	let cygnetDir = path.dirname(req.route.path);
	res.sendFile(path.join(cygnetDir, req.file), options);
});

app.get('/gm/images/z0/:date', attachFileName, function (req, res) {
	let cygnetDir = path.dirname(req.route.path);
	res.sendFile(path.join(cygnetDir, req.file), options);
});

// Metadata
// ========
app.get('/gm/data/x0/', function (req, res) {
	res.sendFile("/gm/meta/x0/info.json", options);
});

app.get('/gm/data/y0/', function (req, res) {
	res.sendFile("/gm/meta/y0/info.json", options);
});

app.get('/gm/data/z0/', function (req, res) {
	res.sendFile("/gm/meta/z0/info.json", options);
});

// data
// ====
app.get('/gm/data/x0/:date', attachFileName, function (req, res) {
	let cygnetDir = path.dirname(req.route.path);
	res.sendFile(path.join(cygnetDir, req.file), options);
});

app.get('/gm/data/y0/:date', attachFileName, function (req, res) {
	let cygnetDir = path.dirname(req.route.path);
	res.sendFile(path.join(cygnetDir, req.file), options);
});

app.get('/gm/data/z0/:date', attachFileName, function (req, res) {
	let cygnetDir = path.dirname(req.route.path);
	res.sendFile(path.join(cygnetDir, req.file), options);
});

app.get('/ionosphere/data/:date', attachFileName, function (req, res) {
	let cygnetDir = path.dirname(req.route.path);
	res.sendFile(path.join(cygnetDir, req.file), options);
});

app.listen(3000, function () {
 	console.log('iswa test server is listening on port 3000');
});




function attachFileName(req, res, next) {

	req.file = getFileName(path.dirname(req.route.path), req.params.date)

	next();
}

function getFileName(directory, date){
		let timestamp = decodeURIComponent(date) //2996-01-23%2000:44:00
		timestamp = timestamp.split(/\-| |:/);
		timestamp = timestamp.join('');
		timestamp = Number(timestamp);
		let files = fs.readdirSync("./public/" + directory);

		//should check so that all files are data files
		let fileIndex = files.findIndex( (file) => {
			let date = file.substr(0, 8);
			let time = file.substr(9, 6);
			let datetime = Number(date + time);
			if(timestamp < datetime){
				return true;
			} else {
				return false;
			}
		});

		let fileName;
		if(fileIndex == -1){
			fileIndex = files.length - 1; 
			fileName = files[fileIndex];
		}else if (fileIndex == 0){
			fileName = "noimage.jpg";
		}else {
			fileIndex -= 1;
			fileName = files[fileIndex];
		}
		return fileName;
}