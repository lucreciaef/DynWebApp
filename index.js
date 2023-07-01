// Include Node HTTP library
const http = require("http");
// Include Express module
const express = require("express");
const expressSanitizer = require('express-sanitizer');
// Include body-parser module
const bodyParser= require ("body-parser");
// Create Express instance
const app = express();

const sqlite = require("sqlite3").verbose();

// connect to database
const db = new sqlite.Database("myblog.sqlite", (err) => {
	if (err) {
		console.error(err.message);
	}
	console.log("Connected to SQLite database");
});
global.db = db;

const port = 8087;
app.use(bodyParser.urlencoded({ extended: true }));

// Mount express-sanitizer middleware here
app.use(expressSanitizer());

//This requires the main.js file inside the /routes folder passing in the
// Express app as an argument. You will add all the routes to this file later.
require("./routes/main")(app);

// This sets the path to the topic3/htmlExpress/views folder for the EJS engine
app.set("views",__dirname + "/views");
app.use('/css', express.static(__dirname + '/css'));


// This tells Express that you want to use EJS
// as the templating engine for this application
app.set("view engine", "ejs");

// This tells Express that you want to render html pages
app.engine("html", require("ejs").renderFile);

app.listen(port, () =>
	console.log(`Example app listening on port ${port}!`));
