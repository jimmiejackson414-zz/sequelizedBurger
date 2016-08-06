var express = require('express');
var router = express.Router();
var burger = require('../models/burger.js');

//get route -> index
router.get('/', function(req,res) {
		res.redirect('/burgers')
});

router.get('/burgers', function(req,res) {
	//express callback response by calling burger.selectAllBurger
	burger.findAll({}).then(function(result){
		//wrapper for orm.js that using MySQL query callback will return burger_data, render to index with handlebar
		hbsObj = { burgers: result };
		res.render('index', hbsObj);
	});
});

//post route -> back to index
router.post('/burgers/create', function(req, res) {
	//takes the request object using it as input for buger.addBurger
	burger.create({ burger_name: req.body.burger_name, devoured: req.body.devoured }).then(function() {
		res.redirect('/');
	});
		//wrapper for orm.js that using MySQL insert callback will return a log to console, render back to index with handle
		console.log(result);
	});

//put route -> back to index
router.put('/burgers/update/:id', function(req,res){
	var burgerId = req.params.id;
	burger.update({devoured: req.body.devoured},
		{ where: {
			id: burgerId
		}
		}).then(function() {
			res.redirect('/');
		});
		//wrapper for orm.js that using MySQL update callback will return a log to console, render back to index with handle
		console.log(result);
		
	});

module.exports = router;