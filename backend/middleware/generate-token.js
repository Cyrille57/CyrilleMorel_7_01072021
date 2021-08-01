///////////////////////////////////////////////
// Middleware d'authentification: /////////////
///////////////////////////////////////////////
/*
//////////////////////////////////////////////////////////////////////////////////////////////
// Importe dotEnv :
const dotEnv = require("dotenv").config();

// Importe le package qui créer et vérifie les tokens d'authentification:
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  generateTokenForUser(() => {

    const username = req.body.username
      const user = {
        name: username
      }

    const accessToken = jwt.sign(
      user,
      process.env.TOKEN_LOGIN_USER, {
        sub: user.id,
        expiresIn: process.env.ACCESS_TOKEN_LIFE,
        algorithm: process.env.ALGO_TOKEN
      }
    )

    const refreshToken = jwt.sign(
      user,
      process.env.REFRESH_TOKEN_USER, {
        sub: user.id,
        expiresIn: process.env.REFRESH_TOKEN_LIFE,
        algorithm: process.env.ALGO_TOKEN
      }
    )

    //stocker le jeton d'actualisation dans le tableau utilisateur
    users[username].refreshToken = refreshToken

    //envoyer le jeton d'accès au client dans un cookie
    res.cookie("jwt", accessToken, {
      secure: true,
      httpOnly: true
    })
    res.send()

  }),

  parseAuthorization((authorization) => {
    return (authorization != null) ? authorization.replace('Bearer ', '') : null;
  }),


}
*/
