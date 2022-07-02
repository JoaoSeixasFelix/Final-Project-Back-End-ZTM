const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");
const cors = require("cors");
const knex = require("knex");
const pg = require("pg");
const bcrypt = require("bcrypt");
const signup = require("./controllers/signup");
const signin = require("./controllers/signin");
const image = require("./controllers/image");
const profile = require("./controllers/profile");
const saltRounds = 10;
app.use(favicon(__dirname + "/favicon.ico"));
app.use(express.json());
app.get("/", (_, res) => res.sendFile(__dirname + "/index.html"));
const accessControlAllowOrigin = "*";
// const options = {
//   origin: accessControlAllowOrigin,
// };
const dataBase = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
app.use(cors());
app.use(bodyParser.json());

app.get("/", (res, req) => {
  res.send("it's working");
});

app.post("/signin", (req, res) => {
  signin.handleSignIn(req, res, dataBase, bcrypt, saltRounds);
});

app.post("/signup", (req, res) => {
  signup.handleSignUp(req, res, dataBase, bcrypt, saltRounds);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfile(req, res, dataBase);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, dataBase);
});

const port_number = app.listen(process.env.PORT || 3000);
app.listen(port_number);
