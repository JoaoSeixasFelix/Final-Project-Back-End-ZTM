const jwt = require('jsonwebtoken');

const handleSignUp = (req, res, dataBase, bcrypt, saltRounds) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json('incorrect form submission');
  }

  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);

  dataBase
    .transaction((trx) => {
      trx
        .insert({
          hash: hash,
          email: email,
        })
        .into('login')
        .returning('email')
        .then((loginEmail) => {
          return trx('users')
            .returning('*')
            .insert({
              email: loginEmail[0].email,
              name: name,
              joined: new Date(),
            })
            .then((user) => {
              // Geração do token JWT após o signup
              const token = jwt.sign(
                { id: user[0].id, email: user[0].email, name: user[0].name, entries: user[0].entries, joined: user[0].joined },
                'smart_brain',
                { expiresIn: '1h' } // Token expira em 1 hora
              );

              // Enviar o token junto com os dados do usuário
              res.json({ user: user[0], token });
            });
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .catch((err) => res.status(400).json('unable to register'));
};

module.exports = {
  handleSignUp: handleSignUp,
};