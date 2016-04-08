"use strict";
var express = require('express');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var index = require('./index.js');

var app = express();

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));


// Images
// ======
app.get('/gm/images/x0/:date', getfile, function (req, res) {
	console.log(req.file)
	res.redirect(req.file);
});

app.get('/gm/images/y0/:date', getfile, function (req, res) {

	res.redirect(req.file);
});

app.get('/gm/images/z0/:date', getfile, function (req, res) {

	res.redirect(req.file);
});

// Metadata
// ========
app.get('/gm/data/x0/', function (req, res) {

	res.redirect("../../meta/x0/info.txt");
});

app.get('/gm/data/y0/', function (req, res) {

	res.redirect("../../meta/y0/info.txt");
});

app.get('/gm/data/z0/', function (req, res) {

	res.redirect("../../meta/z0/info.txt");
});

// data
// ====
app.get('/gm/data/x0/:date', getfile, function (req, res) {
	console.log(req.file)
	res.redirect(req.file);
});

app.get('/gm/data/y0/:date', getfile, function (req, res) {

	res.redirect(req.file);
});

app.get('/gm/data/z0/:date', getfile, function (req, res) {

	res.redirect(req.file);
});

// ID API
// ======
app.get('/:id', function (req, res) {
	res.redirect(index.data[req.params.id]);
});

app.get('/image/:id/:date', function (req, res) {

	res.redirect(index.image[req.params.id] + req.params.date);
});

app.get('/data/:id/:date', function (req, res) {
	res.redirect(index.data[req.params.id] + req.params.date);
});

app.listen(3000, function () {
 	console.log('iswa test server is listening on port 3000');
});



function getfile(req, res, next) {

	let timestamp = decodeURIComponent(req.params.date) //2996-01-23%2000:44:00
	timestamp = timestamp.split(/\-| |:/);
	timestamp = timestamp.join('');
	timestamp = Number(timestamp);

	let files = fs.readdirSync("./public/" + path.dirname(req.route.path));
	//should check so that all files are data files

	let fileIndex = files.findIndex( (file) => {

		let datetime = Number(file.replace('_', ''));

		if(timestamp < datetime){
			return true;
		} else {
			return false;
		}
	});

	if(fileIndex == -1){
		fileIndex = files.length - 1; 
		req.file = files[fileIndex];
	}else if (fileIndex == 0){
		req.file = "noimage.jpg";
	}else {
		fileIndex -= 1;
		req.file = files[fileIndex];
	}

	next();
}

function getPathFromId(req, res, next){

}