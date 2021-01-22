var express = require("express");
var bodyParser = require("body-parser");
var app = express();
const fetch   = require('node-fetch');

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "pug");
//render css files
app.use(express.static("public"));

//placeholders for added task
var feeds = [{"feedkey":'cbb8d444591def61d4e59f9b53d3193dd7724a9d8599c6ee'},{"feedkey":'3897755c6379d00bbb1d622827b1ffd1ba6a0579802044c9'}];
//placeholders for removed task
//var complete = [{"feedkey":23523}];

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


//set app to listen on port 3000
app.listen(3004, function() {
    console.log("server is running on port 3004");
});