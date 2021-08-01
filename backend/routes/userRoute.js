///////////////////////////////////////////////
// Logique de routing auth: ///////////////////
///////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////
// Importation :

// Framework Express:
const express = require('express')

// Création de gestionnaires de route modulaires:
const router = express.Router()

// AuthAdmin:
const authAdmin = require('../middleware/authAdmin')

// auth.js:
const auth = require('../middleware/auth')

// User Controller:
const userCtrl = require('../controllers/userCtrl')

//////////////////////////////////////////////////////////////////////////////////////////////
// Routes:

// *****************************************************************************************
// Authentification:

// Signup:
router.post('/signup', userCtrl.signup)

// Login:
router.post('/login', userCtrl.login)

// LogOut:
/router.get('/logout', userCtrl.logout)

// *****************************************************************************************
// Crud User:

// Récupére via l'id:
router.get('/:id', auth, userCtrl.getOneUser)

// Récupére tout:
router.get('/', auth, userCtrl.getAllUsers)

// Modifie le user:
router.put('/:id', auth, userCtrl.modifyUser);

// Supprime le user:
router.delete('/:id', auth, userCtrl.deleteUser);

// Admin:
//router.get('/', userCtrl.getUserProfil);

// Page 404:
//router.get('*', userCtrl.notFound )

//////////////////////////////////////////////////////////////////////////////////////////////
// Exportation:
module.exports = router
