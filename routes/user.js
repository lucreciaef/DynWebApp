
/**
 * These are example routes for user management
 * This shows how to correctly structure your routes for the project
 */

const express = require("express");
const router = express.Router();
// const assert = require('assert');

/**
 * @desc retrieves the current users
 */
// router.get("/get-test-users", (req, res, next) => {
//
//   //Use this pattern to retrieve data
//   //NB. it's better NOT to use arrow functions for callbacks with this library
//   global.db.all(
//       "SELECT * FROM testUsers", function (err, rows) {
//     if (err) {
//       next(err); //send the error on to the error handler
//     } else {
//       res.json(rows);
//     }
//   });
//
// });

/**
 * @desc retrieves the current user records
 */
// router.get("/get-user-records", (req, res, next) => {
//   //USE this pattern to retrieve data
//   //NB. it's better NOT to use arrow functions for callbacks with this library
//
//   global.db.all(
//       "SELECT * FROM testUserRecords", function (err, rows) {
//     if (err) {
//       next(err); //send the error on to the error handler
//     } else {
//       res.json(rows);
//     }
//   });
// });

/**
 * @desc Renders the page for creating a user record
 */
router.get("/login", (req, res) => {
  res.render("login.html", {title:"Log in to the BigBlogger"});
});

router.post("/login", (req, res, next) => {

  const username = req.body['username'];
  const password = req.body['password'];

  global.db.get(
      "SELECT COUNT(*) FROM author WHERE author_username = ? AND author_password = ? LIMIT 1;",
      [username, password],
      function ( err, row) {
        if (err) {
          next(err); //send the error on to the error handler
        }
        else if (row['COUNT(*)'] === 0) {
          res.send(`404 Username not found. Go back and try again.`);
          next();
        }
        else if (row['COUNT(*)'] === 1) {
            res.redirect("/author/authorhome")

          next();
        }
        else if (row['COUNT(*)'] > 1) {
            res.send(`Duplicate username. Please register only once.`);
            next();
        }
      }
  );
});

/**
 * @desc Renders the page for creating a user record
 */
router.get("/register-author", (req, res) => {
  res.render("create-user-record.ejs");
});

/**
 * @desc Add a new user record to the database for user id = 1
 */
router.post("/register-author", (req, res, next) => {
  //USE this pattern to update and insert data
  //NB. it's better NOT to use arrow functions for callbacks with this library
  // const data = generateRandomData(10);const

  const firstName = req.body['firstname'];
  const lastName = req.body['lastname'];
  const username = req.body['username'];
  const password = req.body['password'];

  global.db.run(
    "INSERT INTO author ('author_first_name', 'author_last_name', 'author_username', 'author_password') VALUES(?, ?, ?, ? );",
    [firstName, lastName, username, password],
    function (err) {
      if (err) {
          console.log("Error when using sql")
        next(err); //send the error on to the error handler
      } else {
        // res.send(`New data inserted @ id ${this.lastID}!`);
          res.render("registrationsuccessful.html", {
              title: "Registration successful!"
          })
        next();
      }
    }
  );
});

router.get("/readmode", async (req, res) => {
    const articleId = req.query['articleId'];

    let article = await new Promise((resolve, reject) => {
        global.db.all(
            "SELECT articles.*, author.author_first_name, author.author_last_name, author.author_id FROM articles JOIN author ON author.author_id = articles.article_author_id WHERE article_status = 'published' AND article_id = ?",
            [articleId],
            function ( err, articles) {
                if (err) {
                    return reject(err);
                }
                else if(articles.length > 0) {
                    return resolve(articles[0]);
                }
            }
        );
    });

    let comments = await new Promise((resolve, reject) => {
        global.db.all("SELECT * FROM comments where comment_article_id = ? order by comment_date;",
            [articleId],
            function ( err, comments) {
                if (err) {
                    return reject(err);
                }
                else {
                    return resolve(comments);
                }
            });
    });

    //send the error on to the error handler

    res.render("readmode.html", {
        article: article,
        comments: comments
    })
});

router.get("/readmode_like", (req, res) => {
    const articleId = req.query['articleId'];

    global.db.run("UPDATE articles SET article_likes = article_likes + 1 where article_id = ?;",
        [articleId],
        function ( err) {
            if (err) {
                res.fail("database error");
                return reject(err);
            }
            else {
                res.send("");
            }
        });
});


///////////////////////////////////////////// HELPERS ///////////////////////////////////////////

/**
 * @desc A helper function to generate a random string
 * @returns a random lorem ipsum string
 */
// function generateRandomData(numWords = 5) {
//   const str =
//     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";
//
//   const words = str.split(" ");
//
//   let output = "";
//
//   for (let i = 0; i < numWords; i++) {
//     output += choose(words);
//     if (i < numWords - 1) {
//       output += " ";
//     }
//   }
//
//   return output;
// }

/**
 * @desc choose and return an item from an array
 * @returns the item
 */
// function choose(array) {
//   assert(Array.isArray(array), "Not an array");
//   const i = Math.floor(Math.random() * array.length);
//   return array[i];
// }

module.exports = router;
