///////////////////////////////////////////////
// app.js /////////////////////////////////////
///////////////////////////////////////////////


// Contient l'application *********************


//////////////////////////////////////////////////////////////////////////////////////////////
// Importation :

// Framework Express:
const express = require('express')

// Module Helmet:
const helmet = require("helmet");

// Package body-parser:
const bodyParser = require('body-parser') // Convertit le corp de la requéte en json en objet Js

// Mysql:
const connectDB = require('./config/connexion')

// Route Auth:
//const authRoute = require('./routes/userRoute')

// Route User:
const userRoute = require('./routes/userRoute')
// Route Post:
const postRoute = require('./routes/postRoute')
// Route Comment:
const commentRoute = require('./routes/commentRoute')


// Instance de l'objet express :
const app = express()

// Module helmet:
app.use(helmet());


//////////////////////////////////////////////////////////////////////////////////////////////
// Ajoute des headers pour permettre l'accées à l'api:

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*') // accés depuis localhost ou si en ligne, mettre l'ip du serveur
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  )
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  )
  next()
})


//////////////////////////////////////////////////////////////////////////////////////////////
// Appelée à chaque requête envoyée au serveur:

// Body-parser,défini la fonction json, comme middleware global pour l'application:
app.use(bodyParser.json()) // convertit le corp de la requéte en json en objet Javascript
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
) // force le parse dans les objet inclus dans d'autre


// Les routes:
// Authentification:
//app.use('/api/auth', authRoute);
// User:
app.use('/api/users', userRoute);
// Post:
app.use('/api/posts', postRoute);
// Comment:
app.use('/api/comments', commentRoute);


//////////////////////////////////////////////////////////////////////////////////////////////
// Exportation:
module.exports = app
