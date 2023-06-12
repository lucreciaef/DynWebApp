// Include Node HTTP library
const http = require("http");
// Include Express module
const express = require("express");
const expressSanitizer = require('express-sanitizer');
// Include body-parser module
const bodyParser= require ("body-parser");
// Create Express instance
const app = express();

const mysql = require("mysql2")
const port = 8087;

const db = mysql.createConnection ({
	host: "localhost",
	user: "root",
	password: "testing1234!",
	database: "myBookshop"
});
// connect to database
db.connect((err) => {
	if (err) {
		throw err;
	}
	console.log("Connected to database");
});
global.db = db;

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
