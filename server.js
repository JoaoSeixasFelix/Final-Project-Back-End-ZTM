const express = require("express");
const app = express();
const favicon = require("serve-favicon");
const cors = require("cors");
const knex = require("knex");
const bcrypt = require("bcrypt");
const signup = require("./controllers/signup");
const signin = require("./controllers/signin");
const image = require("./controllers/image");
const profile = require("./controllers/profile");
const saltRounds = 10;
const options = require("./cors/options");
app.use(favicon(__dirname + "/favicon.ico"));
app.use(express.json());
app.get("/", (_, res) => res.sendFile(__dirname + "/index.html"));
app.use(cors(options.headers));

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: "joaopaulo",
    password: "kakaroto123",
    database: "smart-horse",
  },
});

app.get("/", (res, req) => {
  res.send("it's working");
});

app.post("/signin", (req, res) => {
  signin.handleSignIn(req, res, db, bcrypt, saltRounds);
});

app.post("/signup", (req, res) => {
  signup.handleSignUp(req, res, db, bcrypt, saltRounds);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfile(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

const port_number = app.listen(process.env.PORT || 3000);
app.listen(port_number);
