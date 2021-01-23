var db = require("../src/database.js");
//const sqlite = require("../src/aa-sqlite");

//require('dotenv').config({ path: __dirname + '/.env' })
//var base_url = process.env['BASE_URL']

function getFeedDetails(feedmap_pubkey) {

    var sql = 'SELECT * FROM feedmaps WHERE public_key = $1;';
    var params = [feedmap_pubkey];

    db.all(sql, params, (err, response) => {
        if (err) {
          //res.status(400).json({"error":err.message});
          console.log(err);
          //return err;
        } 
        else{
        console.log(response[0]);
        return response;
        }
      });
}

/*
const getFeedDetails = (feedmap_pubkey) => db.run('SELECT * FROM feedmaps WHERE public_key = $1', [feedmap_pubkey]).then(response => response.rows[0])
.catch((err) => {
    console.log("couldn't find feed_id for that key!");
  });
*/

  /*
const restructureJSON = (feed_pubkey, feed_name, inputJSON) => {
    var structjson=[];
var alldata = inputJSON;
            alldata.forEach(element => {
                //console.log(element);
                var id = element.id;
                var timestamp = element.created;
                //var feed_key = feed_pubkey;
                //need to make this non-manual
                var parameters = {"co2":element.co2,"tempc":element.tempc,"humidity":element.humidity,"mic":element.mic,"auxpressure":element.auxpressure,"auxtempc":element.auxtemp,"aux001":element.aux001,"aux002":element.aux002};
                structjson.push({"id":id, "timestamp":timestamp,parameters});
            });
   return({"feed_pubkey":feed_pubkey,"feed_name":feed_name,"data": structjson});
}
*/

/*
const getFeedDetails = (feedmap_pubkey) => {
    var feedmap_id = 1;
    var feedmap_name = "hello";
    return {"feedmap_id":feedmap_id,"feedmap_name":feedmap_name};
}
*/
/*
function getFeedDetails(feedmap_pubkey) {e
    console.log('hello');
  };
*/


// serve the most recent data points in JSON format
//app.get("/:feedmap_pubkey/json", (req, res, next) => {
exports.getJSON = (req,res,next) =>  {

    var feedmap_pubkey = req.params.feedmap_pubkey;

    console.log("feedmap_pubkey=",feedmap_pubkey);

    var sql = 'SELECT * FROM feedmaps WHERE public_key = $1;';
    var params = [feedmap_pubkey];

    db.all(sql, params, (err, response) => {
        if (err) {
          //res.status(400).json({"error":err.message});
          console.log(err);
          //return err;
        } 
        else{
        console.log(response[0]);
        var feedmap_params = response[0];
        var feedmap_id = feedmap_params.feed_id;
        var feedmap_name = feedmap_params.name;

        db.all('SELECT * FROM feeds WHERE feedmap_id = $1', [feedmap_id], (err, results) => {
            if (err) throw err
            //res.status(200).json(restructureJSON(feed_pubkey, feed_name, results.rows));
            res.status(200).json(results.rows);

        });
        }
    });

}
