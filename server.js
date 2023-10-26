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
app.get("/", (_, res) => res.send("it's working"));

const accessControlAllowOrigin = "*";
const options = {
  origin: accessControlAllowOrigin,
};
const dataBase = knex({
  client: "pg",
  connection: {
    host: '127.0.0.1',
    user: 'joao',
    password: 'Kakaroto@53787',
    database: 'smart_brain'
  },
});
app.use(cors(options));
app.use(bodyParser.json());

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

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});