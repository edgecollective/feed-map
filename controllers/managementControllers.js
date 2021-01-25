var db = require('../config/database');
require('dotenv').config({path: __dirname + '/../../.env'})
//var networkUtil = require('../utils/networkUtil');
const crypto = require("crypto");

require('dotenv').config({ path: __dirname + '/.env' })
var base_url = process.env['BASE_URL']

const getFeedDetails = (feedmap_pubkey) => db.query('SELECT * FROM feedmaps WHERE public_key = $1', [feedmap_pubkey]).then(response => response.rows[0])
.catch((err) => {
    console.log("couldn't find feedmap_id for that key!");
  });

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

exports.feedAdmin = function(req, res, next) {
    // Extract into variables from request body
    //var { feed_name} = req.body;
    //router.get('/:feedmap_pubkey/:feedmap_privkey', manager.feedAdmin);
    //console.log(req.params);

    var public_key = req.params.feedmap_pubkey;
    var private_key = req.params.feedmap_privkey;

    //console.log(public_key);


    var feedmap_name = 'hello';
    //var public_key = '2342';
    //var private_key = '234234'
    var map_url = '234234'
    var base_url = '234234'
    
    //res.status(200).render('manage_feedmap',{feedmap_name:feedmap_name,feedmap_pubkey:public_key,private_key:private_key,map_url:map_url,base_url:base_url});

    getFeedDetails(String(public_key))
    .then((feedmap_params) => {
       console.log(feedmap_params);
   res.render('manage_feedmap',{feedmap_pubkey:feedmap_params.public_key,private_key:private_key,feedmap_name:feedmap_params.name,map_url:feedmap_params.map_url,base_url:base_url});
    }).catch((err) => {
       console.log("Something went wrong with getPage!");
      });

}
