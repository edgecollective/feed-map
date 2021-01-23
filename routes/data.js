var express = require('express');
var router = express.Router();
var path = require("path");
var data_feeds = require('../controllers/dataControllers');

router.get('/:feedmap_pubkey/json/', data_feeds.getJSON);

module.exports = router;