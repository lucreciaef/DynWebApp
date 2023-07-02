// Include Express module
const express = require("express");
const expressSanitizer = require('express-sanitizer');
// Include body-parser module
const bodyParser= require ("body-parser");
// Create Express instance
const app = express();

const sqlite3 = require("sqlite3").verbose();

// connect to database
global.db = new sqlite3.Database('./database.db', (err) => {
	if(err){
		console.error(err);
		process.exit(1); //Bail out we can't connect to the DB
	}else{
		console.log("Database connected");
		global.db.run("PRAGMA foreign_keys=ON"); //This tells SQLite to pay attention to foreign key constraints
	}
});


const port = 8087;
// Mount express-sanitizer middleware here
app.use(expressSanitizer());
app.use(bodyParser.urlencoded({ extended: true }));

const userRoutes = require('./routes/user');

//this adds all the userRoutes to the app under the path /user
app.use('/user', userRoutes);

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
