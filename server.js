const express = require("express");
const server = express();

server.use(express.urlencoded({ extended: true }));
server.set("view engine", "ejs");

let Tid;
let posts = [];
let random;

server
  .route("/userPosts")
  .post((req, res) => {
    posts.push({ id: Tid, text: req.body.name });
    res.redirect("/userPosts"); // which then goes to the same route and to the method get
  })
  .get((req, res) => {
    res.render("viewPosts", { posts });
  });

server.post("/userPosts/delete", (req, res) => {
  posts = posts.filter((post) => post.id != Tid);
  res.redirect("/userPosts"); // which then goes to the same route and to the method get
});

server.get("/:id?", (req, res) => {
  random = Math.floor(Math.random() * 1000);
  Tid = req.params.id || random;
  res.render("mainPage", { id: Tid });
});
const port = 3000;
server.listen(port, () => console.log("server listening on port " + port));
