const express = require("express");
const app = express();
app.use(express.json());

const dataBase = {
  users: [
    {
      id: "123",
      name: "Jonh",
      email: "jonhconstantine@gmail.com",
      password: "cookies",
      entries: "0",
      joined: new Date(),
    },
    {
      id: "1234",
      name: "Sally",
      email: "sally@gmail.com",
      password: "bananas",
      entries: "0",
      joined: new Date(),
    },
  ],
};

app.get("/", function (req, res) {
  res.send(dataBase.users);
});

app.post("/signin", (req, res) => {
  if (
    req.body.email === dataBase.users[0].email &&
    req.body.password === dataBase.users[0].password
  ) {
    res.json(`Sucess Login. Hello, ${dataBase.users[0].name} welcome again`);
  } else {
    res.status(400).json("error logging in");
  }
});

app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  dataBase.users.push({
    id: "125",
    name: name,
    email: email,
    password: password,
    entries: "0",
    joined: new Date(),
  });
  res.json(dataBase.users[dataBase.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  dataBase.users.forEach((users) => {
    if (users.id === id) {
      found = true;
      res.json(users);
    }
  });
  if (!found) {
    res.status(400).json("not found");
  }
});

app.put("/profile/image", (req, res) => {
  const { id } = req.body;
  let found = false;
  dataBase.users.forEach((users) => {
    if (users.id === id) {
      found = true;
      users.entries++;
      res.json(users.entries);
    }
  });
  if (!found) {
    res.status(400).json("not found");
  }
});

app.listen(3000, () => {
  console.log("App is running on port 3000");
});
