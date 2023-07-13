
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
					articles: articlesAuthorJoined,
					result_message: null
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
		title:"Submit a new article",
		error: null
	})
});

router.post("/newarticle", (req, res, next) => {

	const art_title = req.body['title'];
	const art_subtitle = req.body['subtitle'];
	const art_username = req.body['username'];
	const art_text = req.body['article_text']
	const art_likes = 0;
	const art_status = 'draft';

	// Get the current date in 'yyyy-mm-dd' format
	const now = new Date();
	const art_date = now.toISOString().split('T')[0];

	// Fetch author_id from author table
	global.db.get(
		"SELECT author_id FROM author WHERE author_username = ?",
		[art_username],
		function (err, row) {
			if (err) {
				next(err);
				return;
			}
			if (!row) {
				res.render("newarticle.html", {
					title: "Submit a new article",
					error: "No author found with the provided username"
				});
				return;
			}

			// Use the author_id from the fetched row
			const art_author_id = row.author_id;
			global.db.run(
				"INSERT INTO articles (article_title, article_subtitle, article_author_id, article_status, article_date_create, article_body, article_likes) VALUES(?, ?, ?, ?, ?, ?, ?);",
				[art_title, art_subtitle, art_author_id, art_status, art_date, art_text, art_likes],
				function (err, next) {
					if (err) {
						next(err);
					}
					else {
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
										articles: articlesAuthorJoined,
										result_message: "New draft has been saved successfully!",
										error:null
									})
								}
							}
						)
					}
				}
			);
		}
	);
});

// 	global.db.run(
// 		"INSERT INTO articles (article_title, article_subtitle, article_status, article_date_create, article_body, article_likes) VALUES(?, ?, ?, ?, ?, ?);",
// 		[art_title, art_subtitle, art_status, art_date, art_text, art_likes],
// 		function (err) {
// 			if (err) {
// 				next(err); //send the error on to the error handler
// 			} else {
// 				res.render("authorhome.html", {
// 					heading1:"Manage your articles",
// 					result_message: "New draft has been saved successfully!"
// 				})
// 				next();
// 			}
// 		}
// 	);
// });


module.exports = router;
