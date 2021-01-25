var express = require('express');
var router = express.Router();
//var passport = require('passport')
//var basicAuth = passport.authenticate('basic', { session: false })
var manager = require('../controllers/managementControllers');
//var data_feeds = require('../controllers/dataControllers');

router.post('/', manager.postNewFeed);

router.get('/:feedmap_pubkey/:feedmap_privkey', manager.feedAdmin);

module.exports = router;