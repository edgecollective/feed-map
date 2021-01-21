//dependencies required for the app
var express = require("express");
var bodyParser = require("body-parser");
var app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "pug");
//render css files
app.use(express.static("public"));

//placeholders for added task
var feeds = [{"feedkey":23523},{"feedkey":2342352}];
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

//render the ejs and display added task, completed task
app.get("/", function(req, res) {
    res.render("index", { feeds: feeds});
});

//set app to listen on port 3000
app.listen(3001, function() {
    console.log("server is running on port 3001");
});