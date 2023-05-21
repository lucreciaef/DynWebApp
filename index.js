// Include Node HTTP library
const http = require("http");
// Include Express module
const express = require("express");
// Include body-parser module
const bodyParser= require ("body-parser");
// Create Express instance
const app = express();
const port = 8084;

app.use(bodyParser.urlencoded({ extended: true }));

//This requires the main.js file inside the /routes folder passing in the
// Express app as an argument. You will add all the routes to this file later.
require("./routes/main")(app);

// Start the app

// Old JS
// http.createServer(app).listen(8083, function() {
// 	console.log("Express app started");
// });
// ES6

// http.createServer(app).listen(port, () => (
// 	console.log("Express app started")));

// This sets the path to the topic3/htmlExpress/views folder for the EJS engine
app.set("views",__dirname + "/views");

//  This tells Express that you want to use EJS as the templating engine for this application
app.set("view engine", "ejs");

// This tells Express that you want to render html pages
app.engine("html", require("ejs").renderFile);

// ES6
app.get("/", (req, res
) => res.send("<h1>Homepage</h1>"));




app.listen(port, () => console.log(`Example app listening on port ${port}!`));
