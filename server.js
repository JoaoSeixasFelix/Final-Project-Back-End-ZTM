const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("getting root");
});

app.get("/profile", (req, res, next) => {
  res.send("getting profile");
  next();
});

app.post("/profile/123", function (req, res) {
  console.log(req.body);
  res.send("Sucess");
});

app.listen(3000);
