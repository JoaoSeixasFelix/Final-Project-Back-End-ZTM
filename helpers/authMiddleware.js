const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET || "smartbrain";

function authenticateJWT(req, res, next) {
  const token = req.header("Authorization");

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token de autenticação inválido." });
  }

  const tokenValue = token.split(" ")[1];

  try {
    const user = jwt.verify(tokenValue, secretKey);
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Falha na autenticação." });
  }
}

module.exports = authenticateJWT;