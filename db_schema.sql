
-- This makes sure that foreign_key constraints are observed and that errors will be thrown for violations
PRAGMA foreign_keys=ON;

BEGIN TRANSACTION;

--create your tables with SQL commands here (watch out for slight syntactical differences with SQLite)

-- CREATE TABLE IF NOT EXISTS testUsers (
--     test_user_id INTEGER PRIMARY KEY AUTOINCREMENT,
--     test_name TEXT NOT NULL
-- );
--
-- CREATE TABLE IF NOT EXISTS testUserRecords (
--     test_record_id INTEGER PRIMARY KEY AUTOINCREMENT,
--     test_record_value TEXT NOT NULL,
--     test_user_id  INT, --the user that the record belongs to
--     FOREIGN KEY (test_user_id) REFERENCES testUsers(test_user_id)
-- );

CREATE TABLE IF NOT EXISTS author (
    author_id INTEGER PRIMARY KEY AUTOINCREMENT,
    author_first_name TEXT NOT NULL,
    author_last_name TEXT NOT NULL,
    author_username TEXT NOT NULL,
    author_password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS articles (
    article_id INTEGER PRIMARY KEY AUTOINCREMENT,
    article_title TEXT NOT NULL,
    article_subtitle TEXT,
    article_body TEXT NOT NULL,
    article_status TEXT NOT NULL,
    article_author_id INT,
    article_date_create TEXT NOT NULL,
    article_date_publish TEXT,
    article_likes INTEGER,
    FOREIGN KEY (article_author_id) REFERENCES author(author_id)
);

CREATE TABLE IF NOT EXISTS comments (
    comment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    comment_text TEXT NOT NULL,
    comment_username TEXT NOT NULL,
    comment_date TEXT NOT NULL,
    comment_article_id INT,
    comment_likes INTEGER,
    FOREIGN KEY (comment_article_id) REFERENCES articles(article_id)
);



--insert default data (if necessary here)

INSERT INTO testUsers ("test_name") VALUES ('Simon Star');
INSERT INTO testUserRecords ("test_record_value", "test_user_id") VALUES('Lorem ipsum dolor sit amet', 1); --try changing the test_user_id to a different number and you will get an error

COMMIT;

