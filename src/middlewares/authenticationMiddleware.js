const jwt = require('jsonwebtoken');
const secretKey = 'MYSECRETTOKENJWT'; // Cambia por una clave secreta segura

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token de autenticación faltante' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token de autenticación no válido' });
    }
    req.user = user; 
    next();
  });
}

module.exports = authenticateToken;
