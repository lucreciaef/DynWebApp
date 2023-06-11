
//Adding routes to files in /views
//Replaced function(){} with ()=>{}
module.exports = (app) => {
	app.get("/", (req, res) => {
		res.render("index.html", {
			title:"My Bookshop",
			heading1:"Welcome to the new bookshop"
		})
	});

	app.get("/search", (req, res) => {
		res.render("search.html");
	});

	app.get("/search-result-db", (req, res) => {
		//searching in the database
		let word = [req.query.keyword];
		let sqlquery = "SELECT * FROM books WHERE name LIKE ? OR name LIKE ? OR name LIKE ?"; //back ` accent instead of quotes
		// execute sql query

		let q = db.format(sqlquery, [word, word+' %', '% '+word]);
		console.log(q);

		db.query(q,  (err, result) => {

			if (err || result.length===0) {
				// return console.error("No book found with the keyword you have entered"
				// 	+ req.query.keyword + "error: "+ err.message);
				res.redirect("./search");
			}else{
				// res.send(result);
				//step4: (this will show the result of the search using an ejs template file, list.ejs can be used here)
				res.render ('list.html',{availableBooks:result});
			}
		});
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

	app.get("/list", function(req, res) {
		// query database to get all the books
		let sqlquery = "SELECT * FROM books";
		// execute sql query
		db.query(sqlquery, (err, result) => {
			if (err) {
				res.redirect("/");
			}
			res.render("list.html", {availableBooks: result});
		});
	});

	app.get("/addbook", (req,res) => {
		res.render("addbook.html");
	});

	app.post("/addbook", (req,res) => {
		// saving data in database
		let sqlquery = "INSERT INTO books (name, price) VALUES (?,?)";
		// execute sql query
		let newrecord = {name:req.body.name, price:req.body.price};
		db.query(sqlquery, [newrecord.name, newrecord.price], (err, result) => {
			if (err) {
				return console.error(err.message);
			}else
				res.render("addedbook.html", {book:newrecord});
		});
	});
}
