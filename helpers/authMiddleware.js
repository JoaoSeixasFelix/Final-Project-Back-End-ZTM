const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET || "smart_brain";

function authenticateJWT(req, res, next) {
  const authorizationHeader = req.header("Authorization");

  if (!authorizationHeader) {
    return res.status(401).json({ message: "Token de autenticação ausente." });
  }

  const [bearer, token] = authorizationHeader.trim().split(" ");

  if (!bearer || bearer.toLowerCase() !== "bearer" || !token) {
    return res.status(401).json({ message: "Token de autenticação inválido." });
  }

  try {
    const user = jwt.verify(token, secretKey);
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Falha na autenticação." });
  }
}

module.exports = authenticateJWT;