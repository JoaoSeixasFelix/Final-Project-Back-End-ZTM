const jwt = require("jsonwebtoken");
const secretKey = "smartbrain"; // Substitua pela sua chave secreta

function authenticateJWT(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(403)
      .json({ message: "Token de autenticação não fornecido." });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Falha na autenticação." });
    }

    req.user = user;
    next();
  });
}

const verifyToken = (req, res) => {
  try {
    authenticateJWT(req, res, () => {
      res.status(200).json({ message: "Token válido." });
    });
  } catch (error) {
    res.status(500).json({ message: "Erro ao verificar o token." });
  }
};

module.exports = verifyToken;
