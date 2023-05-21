
//Adding routes to files in /views
//Replaced function(){} with ()=>{}
module.exports = (app) => {
	app.get("/", (req, res) => {
		res.render("index.html", {
			title:"Dynamic title",
			heading1:"Dynamic heading"
		})
	});
	app.get("/search", (req, res) => {
		res.render("search.html");
	});
	app.get("/search-result", (req, res) => {
		//searching in the database
		// printing search keyword and results
		res.send("This is the keyword you entered: " + req.query.keyword + "<br>" +
			"This is the result of the search:");
	});
	app.get("/about", (req, res) => {
		res.render("about.html")
	});

	// To display the html
	app.get("/register", (req,res) => {
		res.render("register.html");
	});
	// To display the form data collected
	app.post("/registered", (req,res) => {
		// saving data in database
		res.send("Hello "+ req.body.first + " "+ req.body.last +", you are now registered!" +
		"We will send you a confirmation to your email address: " + req.body.email);
	});
}

