var express = require('express');
var router = express.Router();
var path = require("path");
var data = require('../controllers/dataControllers');

/*
router.get('/', function(req, res, next) {
  res.send('Welcome to Habitat');
});
*/


router.get('/', function(req,res, next){
  //res.sendFile(path.join(__dirname,'../public/form.html')); //make this more robust?
  res.render('landing');
});

router.get('/hello', function(req,res, next){
    //res.sendFile(path.join(__dirname,'../public/form.html')); //make this more robust?
    res.json({"hello":3})
  });



router.get('/feedmap/', function(req,res, next){
    //res.sendFile(path.join(__dirname,'../public/co2_form.html')); //make this more robust?
    //res.render('landing');
    res.render('create_feedmap');
  });

  /*
  router.get('/how-bayou-works/', function(req,res, next){
    res.render('bayou_explained');
      });

router.get('/co2/about/', function(req,res, next){
    res.render('about');
      });
*/

module.exports = router;
