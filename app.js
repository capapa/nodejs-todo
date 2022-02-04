const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/todoRoutes");

const dbURI =
  "mongodb+srv://mrash:mtest1234@nodetuts.wwoi8.mongodb.net/node-todo?retryWrites=true&w=majority";

const app = express();

//app.listen(3000);
mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({}));
app.use(express.json());

app.get("/", (req, res) => {
  res.redirect("/todo");
});

app.use("/todo", router);

app.get((req, res) => {
  res.status(404).render(404);
});
