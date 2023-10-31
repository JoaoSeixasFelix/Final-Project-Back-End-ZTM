const jwt = require("jsonwebtoken");

const handleSignIn = (req, res, dataBase, bcrypt) => {
  dataBase
    .select("email", "hash")
    .from("login")
    .where("email", "=", req.body.email)
    .then((data) => {
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
      if (isValid) {
        return dataBase
          .select("*")
          .from("users")
          .where("email", "=", req.body.email)
          .then((user) => {
            const token = jwt.sign(
              { id: user[0].id, email: user[0].email, name: user[0].name, entries: user[0].entries, joined: user[0].joined },
              'smart_brain'
            );
            res.cookie("auth.token", token, {
            });
            res.json({ user: user[0], token });
          })
          .catch((err) => {
            res.status(400).json("unable to get user");
          });
      } else {
        res.status(400).json("wrong credentials");
      }
    })
    .catch((err) => {
      res.status(400).json("Password or Email wrong.");
    });
};

module.exports = {
  handleSignIn: handleSignIn,
};
