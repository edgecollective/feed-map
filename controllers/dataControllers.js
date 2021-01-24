var db = require('../config/database');
//const sqlite = require("../src/aa-sqlite");

require('dotenv').config({ path: __dirname + '/.env' })
var base_url = process.env['BASE_URL']

const getFeedDetails = (feedmap_pubkey) => db.query('SELECT * FROM feedmaps WHERE public_key = $1', [feedmap_pubkey]).then(response => response.rows[0])
.catch((err) => {
    console.log("couldn't find feedmap_id for that key!");
  });

exports.getPage = function(req, res, next) { // NOW BY PUB_KEY

    //var feedmap_pubkey = req.params.feedmap_pubkey;
    var feedmap_pubkey = 'a3ee855290463869dbb6f48721482fa52da7935054631078';

    console.log('getPage!');

     getFeedDetails(String(req.params.feedmap_pubkey))
     .then((feedmap_params) => {
        console.log(feedmap_params);
    res.render('data',{feedmap_pubkey:feedmap_params.public_key,feedmap_name:feedmap_params.name,map_url:feedmap_params.map_url,base_url:base_url});
     }).catch((err) => {
        console.log("Something went wrong with getPage!");
       });
}
