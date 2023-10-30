const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");
const cors = require("cors");
const authenticateJWT = require("./helpers/authMiddleware");
const knex = require("knex");
const bcrypt = require("bcrypt");
const signup = require("./controllers/signup");
const signin = require("./controllers/signin");
const image = require("./controllers/image");
const profile = require("./controllers/profile");
const saltRounds = 10;

app.use(favicon(__dirname + "/favicon.ico"));
app.use(express.json());

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

// app.use(authenticateJWT);

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

app.post("/verifyToken", (req, res) => {
  authenticateJWT(req, res, () => {
    res.status(200).json({ message: "Token válido." });
  });
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});