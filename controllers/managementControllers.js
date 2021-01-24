var db = require('../config/database');
require('dotenv').config({path: __dirname + '/../../.env'})
//var networkUtil = require('../utils/networkUtil');
const crypto = require("crypto");

require('dotenv').config({ path: __dirname + '/.env' })
var base_url = process.env['BASE_URL']


exports.postNewFeed = function(req, res, next) {
    // Extract into variables from request body
    //var { feed_name} = req.body;
    var feedmap_name = req.body.feedmap_name;

    var map_url = req.body.map_url;

    console.log(feedmap_name);
    
    // Check if the feed_name is valid

    let patt = /^[a-zA-Z0-9\s\-]+$/;
    var dataValid = (
        patt.test(feedmap_name)
    )
    
    if (dataValid)  {
        console.log('Valid feedname.');

        crypto.randomBytes(24, function(err, buffer) {
            var private_key = buffer.toString('hex');
            
            crypto.randomBytes(24, function(err, buffer) {

                var public_key = buffer.toString('hex');

                var insertSQL = 'INSERT INTO feedmaps (name,map_url,public_key,private_key) VALUES ($1,$2,$3,$4);'
                var params = [feedmap_name,map_url,public_key,private_key]
                db.query(insertSQL, params, (error, result) => {
                    if (error) {
                        console.log(`Error: ${error}`)
                        res.status(400).send(error);
                    } else {
                        console.log(`New feedmap '${feedmap_name}' created `);
                        console.log(`with map_url '${map_url}'.\n`);
                        console.log(`and private_key '${private_key}'.\n`);
                        //res.status(200).send(`New feed '${feed_name}' created with private_key '${private_key}'.\n`);
                        //var feed_id = req.params.feed_id;

                        //use the IP address for the feed link; change this once we have a fixed URL:
                        //var ip = networkUtil.getIp();

                        res.status(200).render('feedmap_created',{feedmap_name:feedmap_name,feedmap_pubkey:public_key,private_key:private_key,map_url:map_url,base_url:base_url});//process.exit(0);
                    }
                });
           });

        });
           
        
    
    } else {
        res.status(400).send('Feed name must be only letters, numbers, spaces, or dashes' );
    }

}