///////////////////////////////////////////////
// Middleware d'authentification: /////////////
///////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////
// Importe dotEnv :
const dotEnv = require("dotenv").config();

// Importe le package qui créer et vérifie les tokens d'authentification:
const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
  try {
    // Extrait le token du header Authorization de la requête entrante:
    const token = req.headers.authorization.split(' ')[1];
    // La fonction verify décode le token:
    const decodedToken = jwt.verify(token, process.env.TOKEN_LOGIN_USER);
    // Extrait l'ID user du token:
    const userId = decodedToken.userId;
    // Si la demande contient un ID user, compare à celui extrait du token:
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      // L'user est authentifié:
      next();
    }
  } catch (err) {
    res.status(401).json({
      'message': 'Authentification non valide !',
      'error' : err
    });
  }
};


