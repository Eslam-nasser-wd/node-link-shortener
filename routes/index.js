var express = require('express');
var router = express.Router();
var URL = require('../models/URL')
// var Counter = require('../models/Counter')

/* GET home page. */
router.get('/', function(req, res, next) {
	URL.find({}, function(err, items){
		res.render('index', { 
	  	title: 'URL shortener',
	  	number_of_urls: items.length
	  });
	})
});

// Create and save a new URL
router.post('/shortener', function(req, res, next) {
  var site_url = req.protocol + '://' + req.get('host') + '/'

  var new_url = new URL({
  	key: makeNewKey(),
  	long_url: req.body.long_url
  })

  new_url.save(function(err){
  	if(err){console.log(err)}
  	res.json({
  		key: new_url.key,
  		site: site_url
  	})
  })
});

// Get the short url
router.get('/:url_key', function(req, res, next) {
  var url_key = req.params.url_key;
  URL.findOne({
  	key: url_key
  }, function(err, item){
  	if(err){console.log(err)}

  	res.redirect(item.long_url)
  })
});



function makeNewKey(){
	var new_key = '';
	var possible = '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ';
	for( var i=0; i < 5; i++ ){
		new_key += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return new_key
}

module.exports = router;
