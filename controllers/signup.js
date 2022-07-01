const handleSignUp = (req, res, db, bcrypt, saltRounds) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json("incorrect from submission");
  }
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  try {
    db.transaction((trx) => {
      trx
        .insert({
          hash: hash,
          email: email,
        })
        .into("login")
        .returning("email")
        .then((loginEmail) => {
          return trx("users")
            .returning("*")
            .insert({
              email: loginEmail[0].email,
              name: name,
              joined: new Date(),
            })
            .then((user) => res.json(user[0]));
        })
        .then(trx.commit)
        .catch(trx.rollback);
    });
  } catch (err) {
    res.status(400).json("Password or Email wrong.");
  }
};

module.exports = {
  handleSignUp: handleSignUp,
};
