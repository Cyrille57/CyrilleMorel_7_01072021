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

// *****************************************************************************************
// Authentification:

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

  console.log('userCtrl.js back signUp req.body:')
  console.log(req.body)
  console.log('userCtrl.js back signUp req.body.admin:')
  console.log(req.body.admin)


  // *****************************************************************************************
  // Validation des données:
  /*
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
      if(!bioRegex.test(bio)){
        return res.status(400).json({
          message: ' Les caractéres spéciaux ne sont pas valides'
        })
      }*/
  // *****************************************************************************************
  // Code inscription:
  models
    .findOne({
      attributes: ['email', 'username'],
      where: {
        username: req.body.username,
        email: req.body.email
      }
    })
    .then(
      ((userFound) => {

        if (!userFound) {

          bcrypt.hash(password, 10, function (err, bcryptPassword) {

            const newUser = models
              .create({
                username: username,
                email: email,
                password: bcryptPassword,
                bio: bio,
                admin: false
              })
              .then((newUser) => {
                res.status(201).json({
                  adminoupas: newUser.admin,
                  userId: newUser.id,
                  message: 'Merci, votre inscription est bien pris en compte !'
                })
              })
              .catch((err) => {
                console.log(err)
                res.status(500).json({
                  err: err,
                  error: "Le pseudo existe déja",
                })
              })

          })

        } else {
          return res.status(409).json({
            error: error,
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
    password,
    admin
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
        email: req.body.email
      }
    })
    .then(user => {
      if (user === null) {
        res.status(401).json({
          message: 'Pseudo et/ou mot de passe incorrect !'
        })
      } else {

        console.log('Connexion password:')
        console.log(password)
        console.log('Connexion user.password:')
        console.log(user.password)

        bcrypt.compare(password, user.password)
          .then(valid => {

            console.log('Connexion password:')
            console.log(password)
            console.log('Connexion user.password:')
            console.log(user.password)

            if (!valid) {
              // Retourne une erreur 401 Unauthorized
              return res.status(401).json({
                error: 'Pseudo et/ou mot de passe incorrect !'
              });
            } else {

              res.status(200).json({
                //data: token,
                status: '201',
                userId: user.id,
                adminoupas: user.admin,
                message: 'Authentification reussie !',
                token: jwt.sign({
                    userId: user.id
                  },
                  process.env.TOKEN_LOGIN_USER, {
                    expiresIn: '24h'
                  }
                )


              })

            }

          })

      }




    })

}

exports.logout = (req, res) => [

]


// *****************************************************************************************
// Crud:

// Modifie du user via l'admin:
exports.modifyUser = (req, res) => {

  // *****************************************************************************************
  // Déclarations:
  const {
    id,
    username,
    email,
    admin
  } = req.body

  console.log(req.body)
  console.log(req.params)
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

          //bcrypt.hash(password, 10, function (err, bcryptPassword) {

          user.update({
              username: (username ? username : user.username),
              email: (email ? email : user.email),
              //password: (bcryptPassword ? bcryptPassword : bcryptPassword),
              //bio: (bio ? bio : user.bio)
              admin: (admin ? admin : user.admin)
            })

            .then(() => {
              res.status(201).json({
                message: 'Votre profil a correctement été modifié !'
              })
            })
            .catch((err) => {
              console.log('MISE A JOUR ERR:')
              console.log(err)
              res.status(500).json({
                error: error,
                error: "Impossible de modifier votre profil",

              })
            })

          //})

        } else {
          res.status(404).json({
            message: 'Profil introuvable !',
            error: error,
          })
        }
      })
    .catch((error) => {
      console.log('MISE A JOUR ERR2:')
      console.log(error)
      res.status(500).json({
        message: 'Impossible de vérifier ce profil',
        error: error,
      })
    })

}

// Modifie du user via l'user:
exports.modifyOfUserByUser = (req, res) => {

  // *****************************************************************************************
  // Déclarations:
  const {
    id,
    username,
    email,
    password,
    bio
  } = req.body

  console.log(req.body)
  console.log(req.params)
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
                username: (username ? username : user.username),
                email: (email ? email : user.email),
                password: (bcryptPassword ? bcryptPassword : bcryptPassword),
                bio: (bio ? bio : user.bio)
                //admin: (admin ? admin : user.admin)
              })

              .then(() => {
                res.status(201).json({
                  message: 'Votre profil a correctement été modifié !'
                })
              })
              .catch((err) => {
                console.log('MISE A JOUR ERR:')
                console.log(err)
                res.status(500).json({
                  error: error,
                  error: "Impossible de modifier votre profil",

                })
              })

          })

        } else {
          res.status(404).json({
            message: 'Profil introuvable !',
            error: error,
          })
        }
      })
    .catch((error) => {
      console.log('MISE A JOUR ERR2:')
      console.log(error)
      res.status(500).json({
        message: 'Impossible de vérifier ce profil',
        error: error,
      })
    })

}

// Supprime le user:
exports.deleteUser = (req, res) => {

  models.findOne({
      where: {
        id: req.params.id,
      },
    include:[{ all: true, nested: true }]
    ,
    })
    .then((user) => {

      models.destroy({
          where: {
            id: req.params.id,
          },
        })
        .then(() =>
          res.status(200).json({
            message: 'L\'utilisateur a correctement été supprimé !',
          })
        )
        .catch((error) =>
          res.status(400).json({
            error: error,
          })
        )

    })
    .catch((error) =>
      res.status(500).json({
        message: 'Désolé, l\'utilisateur n\'a pas pu être supprimé !',
        error: error
      })
    )
}

// Récupére via l'id:
exports.getOneUser = (req, res) => {

  console.log('LOG DE REQ.PARAMS:')
  console.log(req.params)
  console.log('LOG DE REQ.BODY:')
  console.log(req.body)



  models.findOne({
      where: {
        id: req.params.id,
      },

    })
    .then((user) => {

      if (user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({
          message: 'User introuvable !',
        })
      }

    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      })
    })
}

// Récupére tout:
exports.getAllUsers = (req, res) => {

  console.log('INFOS ADMIN USERCTRL: req-body-admin')
  console.log(req.body.admin)
  console.log('REQ.PARAMS.ADMIN')
  console.log(req.params.admin)

  models.findAll(
      ({
        attributes: {
          exclude: ['password']
        }
      })
    )
    .then((user) => {
      console.log('Récupere USERCTRL le .then:')
      console.log(req.body.admin)

      /*if (req.body.admin != false){
        console.log('Récupere USERCTRL tout dans le if:')
        console.log(req.body.admin)
        res.status(500)
        res.send('non autorisé')
      }*/
      res.status(200).json(user)
    })
    .catch((error) => {
      res.status(400).json({
        message: 'Désolés, les utilisateurs n\'ont pas pu être chargés',
        error: error
      })
    })
}
