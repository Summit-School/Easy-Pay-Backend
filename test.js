const express = require("express");
const mysql = require("mysql");

// create connection
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodemysql",
});

db.connect((err) => {
  if (err) {
    console.error("error connecting to database", err);
  } else {
    console.log("Databse connected");
  }
});

const app = express();

// create DB
app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE nodemysql";
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.send("Database created...");
  });
});

app.get("/createposttable", (req, res) => {
  let sql =
    "CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Table created");
  });
});

app.get("/addpost", (req, res) => {
  let post = {
    title: "post two",
    body: "This is number two",
  };
  let sql = "INSERT INTO posts SET ?";
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post one created ....");
  });
});

app.get("/getposts", (req, res) => {
  let sql = "SELECT * FROM posts";
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Posts feteched ....");
  });
});

app.get("/getpost/:id", (req, res) => {
  let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post feteched ....");
  });
});

app.get("/updatepost/:id", (req, res) => {
  let newTitle = "Updated title";
  let sql = `UPDATE posts SET title = "${newTitle}" WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post updated ....");
  });
});

app.get("/deletepost/:id", (req, res) => {
  let newTitle = "Updated title";
  let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post deleted ....");
  });
});

app.listen("4000", () => {
  console.log("Server running on port 3000");
});
