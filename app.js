require('dotenv').config({ path: __dirname + '/.env' })
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
const fetch   = require('node-fetch');
var ip = require("ip");
const crypto = require("crypto");
var networkUtil = require('./utils/networkUtil');
var path = require('path');

var indexRouter = require('./routes/index');
var manageRouter = require('./routes/manage');
var dataRouter = require('./routes/data');

var app = express()
var port = process.env['PORT']

app.set('view engine', 'pug');

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/feedmap/data', dataRouter);
app.use('/feedmap/manage',manageRouter);

app.listen(port, () => {
    var ip = networkUtil.getIp();
    console.log(`Feedmaps is up and running at: http://${ip}:${port}`)
})

/*

//placeholders for added task
var feeds = [{"feedkey":'cbb8d444591def61d4e59f9b53d3193dd7724a9d8599c6ee', "feed_name":"Woodshop"},{"feedkey":'3897755c6379d00bbb1d622827b1ffd1ba6a0579802044c9', "feed_name":"Jewelry Shop"}];

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


app.get("/demo", function(req, res) {
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
*/
