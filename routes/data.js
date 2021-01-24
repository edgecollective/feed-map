var express = require('express');
var router = express.Router();
//var passport = require('passport')
//var basicAuth = passport.authenticate('basic', { session: false })
var data = require('../controllers/dataControllers');

//router.get('/latest/', basicAuth, measurements.getLatestMeasurement);

//router.post('/', basicAuth, measurements.postNewMeasurement);

//router.post('/', data.getBasic);

router.get('/:feedmap_pubkey/', data.getPage);

module.exports = router;