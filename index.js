var express = require("express");
var bodyParser = require("body-parser");
var app = express();
const fetch   = require('node-fetch');
var db = require("./src/database.js");
var ip = require("ip");
const crypto = require("crypto");

var dataRouter = require('./routes/data');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.set("view engine", "pug");
//render css files
app.use(express.static("public"));

//placeholders for added task
var feeds = [{"feedkey":'cbb8d444591def61d4e59f9b53d3193dd7724a9d8599c6ee', "feed_name":"Woodshop"},{"feedkey":'3897755c6379d00bbb1d622827b1ffd1ba6a0579802044c9', "feed_name":"Jewelry Shop"}];
//placeholders for removed task
//var complete = [{"feedkey":23523}];

//require('dotenv').config({ path: __dirname + '/.env' })
//var base_url = process.env['BASE_URL']

/*
const getFeedDetails = (feed_pubkey) => db.query('SELECT * FROM feeds WHERE public_key = $1', [feed_pubkey]).then(response => response.rows[0])
.catch((err) => {
    console.log("couldn't find feed_id for that key!");
  });
*/

const getFeedDetails = (feedmap_pubkey) => {
    var feedmap_id = 1;
    var feedmap_name = "hello";
    return {"feedmap_id":feedmap_id,"feedmap_name":feedmap_name};
}

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


//post route for adding new task 
app.post("/addtask", function(req, res) {
    var newFeed = req.body.newfeed;
    //add the new task from the post rouete
    //task.push(newTask);
    feeds.push({'feedkey':newFeed})
    console.log(feeds);
    res.redirect("/");
});

app.post("/removetask", function(req, res) {
    var completeTask = req.body.check;
    //check for the "typeof" the different completed task, then add into the complete task
    if (typeof completeTask === "string") {
        complete.push(completeTask);
        //check if the completed task already exits in the task when checked, then remove it
        task.splice(task.indexOf(completeTask), 1);
    } else if (typeof completeTask === "object") {
        for (var i = 0; i < completeTask.length; i++) {
            complete.push(completeTask[i]);
            task.splice(task.indexOf(completeTask[i]), 1);
        }
    }
    res.redirect("/");
});

/*
//render the ejs and display added task, completed task
app.get("/", function(req, res) {
    res.render("index", { feeds: feeds});
});
*/


app.get("/", function(req, res) {
    //var feedkey = String(req.params.feedkey);
    //var map_url = 'https://www.thoughtco.com/thmb/78yp4LX-ib10jQdSRslNYianKu8=/768x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/floorplan-138720186-crop2-58a876a55f9b58a3c99f3d35.jpg';
    //var map_url = 'https://drive.google.com/uc?id=1i8fIEXVZiW_Hdgt0qFnmY_KZPvT';
    
    var map_url = '/images/a2floor.png';
    
    var allfeeddata = [];

    var itemsProcessed = 0;

    feeds.forEach(feed => {

        var feedkey = feed.feedkey;
        var feedurl = 'http://data.pvos.org/co2/data/'+feedkey+'/json/';        
        fetch(feedurl)
        .then(res => res.json())
        .then(data => {
            allfeeddata.push(data);
            itemsProcessed++;

            if(itemsProcessed=== feeds.length) {
                res.render('map', {bayoudata:allfeeddata,feeds:feeds,map_url:map_url});
            }
        })
        .catch(err => {
            console.log(err);
        });
    });
    
    
   
});



app.post("/new_feedmap", function(req, res) {

    console.log('Got body:', req.body);

    var feedmap_name = req.body.feedmap_name;
    var map_url = req.body.map_url;

    let patt = /^[a-zA-Z0-9\s\-]+$/;

    var feed_name_Valid = (
        patt.test(feedmap_name)
    );

    var map_url_Valid = (
        patt.test(map_url)
    );

    if (feed_name_Valid)  {
        console.log('Valid feedname.');

        crypto.randomBytes(24, function(err, buffer) {
            var private_key = buffer.toString('hex');
            
            crypto.randomBytes(24, function(err, buffer) {

                var public_key = buffer.toString('hex');

                var sql = 'INSERT INTO feedmaps (name,map_url,public_key,private_key) VALUES ($1,$2,$3,$4);'
                var params = [feedmap_name,map_url,public_key,private_key]
                db.run(sql, params, (error, result) => {
                    if (error) {
                        console.log(`Error: ${error}`)
                        res.status(400).send(error);
                    } else {
                        console.log(`New feedmap '${feedmap_name}' created `);
                        console.log(`with key '${private_key}'.\n`);

                        res.status(200).json({feedmap_name: feedmap_name,map_url:map_url,feedmap_pubkey:public_key,private_key:private_key});//process.exit(0);
                    }
                });
           });

        });
           
        
    
    } else {
        res.status(400).send('Feed name must be only letters, numbers, spaces, or dashes' );
    }
});

var local_ip = ip.address();
var HTTP_PORT = 3004;

app.use('/feedmaps/data', dataRouter);


//set app to listen on port 3000
app.listen(HTTP_PORT, function() {
    console.log("server is running at: http://"+String(local_ip)+":"+String(HTTP_PORT));
});