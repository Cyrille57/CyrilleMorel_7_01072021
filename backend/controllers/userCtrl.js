///////////////////////////////////////////////
// Logique globale de l'application (user) ////
///////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////
// Importation :

// Import du models user:
const models = require('../models/user')

// dotEnv :
const dotEnv = require('dotenv').config()

// Fatest-validator: (validateur de saisie)
const Validator = require("fastest-validator");

// Bcrypt:
const bcrypt = require('bcrypt')

// Jsonwebtoken d'authentification:
const jwt = require('jsonwebtoken')

const uuid = require('uuid');

//////////////////////////////////////////////////////////////////////////////////////////////
// Regex :

// Mail:
const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// Password:
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

// Bio:
const bioRegex = /(\w+)([\W+^\s])$/

//////////////////////////////////////////////////////////////////////////////////////////////
// Fonction:

// Inscription:
exports.signup = (req, res) => {

  // *****************************************************************************************
  // Déclarations:
  const {
    username,
    email,
    password,
    bio,
    admin
  } = req.body

  console.log( 'INFOS INSCRIPTION:' )
  console.log(req.body)

  const uuid = require('uuid');
  console.log(uuid.v4());
  // *****************************************************************************************
  // Validation des données:

  // username:
  if (username.length > 20) {
    return res.json({
      status: 'error',
      message: 'Le nombre de caractére dépasse le nombre requis'
    })
  }

  if (username.length <= 2) {
    return res.json({
      status: 'error',
      message: 'Le nombre de caractére n\'as pas atteint le nombre requis'
    })
  }

  // email:
  if (!emailRegex.test(email)) {
    return res.json({
      status: 'error',
      message: 'Le mail n\'est pas valide'
    })
  }

  //  password:
  if (!passwordRegex.test(password)) {
    return res.json({
      status: 'error',
      message: 'Le mot de passe doit contenir une lettre majuscule, une lettre minuscule, un chiffre, un caractère spécial et au moins 8 caractères'
    })
  }

  // bio:
  /*  if(!bioRegex.test(bio)){
      return res.status(400).json({
        message: ' Les caractéres spéciaux ne sont pas valides'
      })
    }*/
  // *****************************************************************************************
  // Code inscription:
  models
    .findOne({
      attributes: ['email', 'username'], // --> instead of ['email'] ['username']
      where: {
        username: req.body.username, // -> If you are getting username from the request body
        email:    Buffer.from(req.body.email).toString("hex")
      }
    })
    .then(
      ((userFound) => {

        if (!userFound) {

          bcrypt.hash(password, 10, function (err, bcryptPassword) {

            const newUser = models
              .create({
                username:   username,
                email:      Buffer.from(req.body.email).toString("hex"),
                password:   bcryptPassword,
                bio:        bio,
                admin:      req.body.admin
              })

              .then((newUser) => {
                res.status(201).json({
                  userId: newUser.id,
                  message: 'Merci, votre inscription est bien pris en compte !'
                })
              })
              .catch((err) => {
                res.status(500).json({
                  error: "Le pseudo existe déja",
                })
              })

          })

        } else {
          return res.status(409).json({
            error: 'L\'email existe déjà',
          })
        }

      })
    )

}

// Connexion:
exports.login = (req, res) => {

  // *****************************************************************************************
  // Déclarations:
  const {
    email,
    password
  } = req.body

  // *****************************************************************************************
  // Validation des données:

  // email:
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: 'Le mail n\'est pas valide'
    })
  }

  //  password:
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message: 'Le mot de passe doit contenir une lettre majuscule, une lettre minuscule, un chiffre, un caractère spécial et au moins 8 caractères'
    })
  }

  // *****************************************************************************************
  // Code connexion:
  models
    .findOne({
      where: {
        email: Buffer.from(req.body.email).toString("hex")
      }
    })
    .then(user => {
      if (user === null) {
        res.status(401).json({
          message: 'Pseudo et/ou mot de passe incorrect !'
        })
      }

      bcrypt.compare(password, user.password)
        .then(valid => {

          if (!valid) {
            // Retourne une erreur 401 Unauthorized
            return res.status(401).json({
              error: 'Pseudo et/ou mot de passe incorrect !'
            });
          }
          res.status(200).json({
            //data: token,
            status:   '201',
            message:  'Authentification reussie !',
            token:    jwt.sign({
                userId: user.id
              },
              process.env.TOKEN_LOGIN_USER, {
                expiresIn: '24h'
              }
            )

          });

        })
    })

}

// Dashboard:
exports.getUserProfil = (req, res) => {

//console.log(req.params.id)

  models.findOne({
    attributes: ['id', 'username', 'email', 'password', 'bio', 'admin'],
    where: {
      id: req.params.id,
      //email:    Buffer.from(req.body.email).toString("hex")
    },
  })
    .then(user => {
      if (user) {

        res.status(200).json(user)
      } else {
        res.status(404).json({
          message: 'Profil introuvable !',
        })
      }

    })
    .catch((error) => {
      res.status(500).json({
        message:'Impossible de vérifier ce profil',
        error: error,
      })
    })
}

// Modifie le user:
exports.modifyUser = (req, res) => {

  // *****************************************************************************************
  // Déclarations:
  const {
    id,
    username,
    email,
    password,
    bio
  } = req.body

  // *****************************************************************************************
  // Code modification:
  models
  .findOne({
    attributes: ['id', 'username', 'email', 'password', 'bio'],
    where: {
      id: req.params.id,
    },
  })
  .then(
    (user) => {
    if (user) {

      bcrypt.hash(password, 10, function (err, bcryptPassword) {

        user.update({
          username:   (username ? username : user.username),
          email:      (email ? email : user.email),
          password:   (bcryptPassword ? bcryptPassword : bcryptPassword),
          bio:        (bio ? bio : user.bio)
        })

        .then(() => {
          res.status(201).json({
            message: 'Votre profil a correctement été modifié !'
          })
        })
        .catch((err) => {
            res.status(500).json({
              error: "Impossible de modifier votre profil",
          })
        })

      })

    } else {
      res.status(404).json({
        message: 'Profil introuvable !',
      })
    }
  })
  .catch((error) => {
    res.status(500).json({
      message:'Impossible de vérifier ce profil',
      error: error,
    })
  })



/*
  let userObject = {}
  userObject = {
    ...req.body,
  }
*/
  // *****************************************************************************************
  // Vakidation des saisies utilisateur:
 /* const schemaValidator = {
    content: {
      type:     "string",
      optional: false,
      min:      2,
      max:      50
    }
  }
  const v = new Validator();
  const validationResponse = v.validate(userObject, schemaValidator)
  if(validationResponse !== true){
    return res.status(400).json({
      message: "Validation échouée",
      errors: validationResponse
    })
  }*/
/*
  models
  .findOne({
    attributes: ['username', 'email', 'password', 'bio'],
    where: {
      id: req.params.id,
    }
  })
  .then(user => {
    models.update({
      _id: req.params.id,
      ...userObject
    },{
      where: {
        id: req.params.id,
      },
    })
    .then(() =>
      res.status(200).json({
        message: 'Votre profil a correctement été modifié !',
      })
    )
    .catch((error) =>
      res.status(400).json({
        message: "Désolé, votre profil n'a pas pu être modifié",
        error: error
      })
    )
  })
  || (userObject = {
        ...req.body,
      });
  models.updateOne(
    {
      _id: req.params.id,
    },
    {
      ...userObject,
      _id: req.params.id,
    }
  )
    .then(() =>
      res.status(200).json({
        message: "Votre profil a correctement été modifié !",
      })
    )
    .catch((error) =>
      res.status(400).json({
        error,
      })
    );
*/

}
