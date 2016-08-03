var express = require('express');
var router = express.Router();
var burger = require('../models/burger.js');
// var bodyParser = require('body-parser');
// var method = require('method-override');

router.get('/', function(req,res) {
	res.redirect('/burgers');
});

router.get('/burgers', function(req,res) {
	burger.all(function(data){
		var hbsObject = { burgers : data }
		console.log(hbsObject);
		res.render('index', hbsObject);
	});
});

router.post('/burgers/create', function (req, res) {
	burger.create(['name', 'devour'], [req.body.name, req.body.devour], function () {
		res.redirect('/burgers');
	});
});

router.put('/burgers/update/:id', function(req,res) {
	var condition = 'id = ' + req.params.id;

	console.log('condition', condition);

	burger.update({ devour: req.body.devour }, condition, function () {
		res.redirect('/burgers');
	});
});

module.exports = router;