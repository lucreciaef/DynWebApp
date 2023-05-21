
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
}

