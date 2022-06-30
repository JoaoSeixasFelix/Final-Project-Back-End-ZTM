const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const knex = require("knex");
const bcrypt = require("bcrypt");
const signup = require("./controllers/signup");
const signin = require("./controllers/signin");
const image = require("./controllers/image");
const profile = require("./controllers/profile");
const saltRounds = 10;

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

const PORT = process.env.port || "3000";
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
