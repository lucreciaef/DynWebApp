
const express = require("express");
const router = express.Router();


router.get("/authorhome", (req, res) => {
	global.db.all(
		"SELECT articles.*, author.author_first_name, author.author_last_name, author.author_id FROM articles JOIN author ON author.author_id = articles.article_author_id WHERE article_status = 'draft'",
		[],
		function ( err, articlesAuthorJoined, next) {
			if (err) {
				next(err); //send the error on to the error handler
			}
			else {
				res.render("authorhome.html", {
					title:"Welcome BigBlogger author",
					heading1:"Manage your articles",
					articles: articlesAuthorJoined
				})
			}
		}
	);
});

router.get("/edit", (req, res) => {
	res.render("editmode.html", {
		title:"Edit your article"
	});
});

router.get("/settings", (req, res) => {
	res.render("settings.html", {
		title:"Author settings"
	})
});

router.get("/newarticle", (req, res) => {
	res.render("newarticle.html", {
		title:"Submit a new article"
	})
});


module.exports = router;
