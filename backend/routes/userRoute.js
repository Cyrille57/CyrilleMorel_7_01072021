///////////////////////////////////////////////
// Logique de routing user: ///////////////////
///////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////
// Importation :

// Framework Express:
const express = require('express')

// Création de gestionnaires de route modulaires:
const router = express.Router()

// PostController:
const userCtrl = require('../controllers/userCtrl')

// auth.js:
const auth = require('../middleware/auth')

//////////////////////////////////////////////////////////////////////////////////////////////
// Routes:

// Signup:
router.post('/signup', userCtrl.signup)

// Login:
router.post('/login', userCtrl.login);

// Modifie le mdp:
//router.post('/change_password', userCtrl.changePasswordUser);

// Modifie le user:
router.put('/:id', auth, userCtrl.modifyUser)

// Supprime le user:
//router.delete('/:id', userCtrl .deletePost)

// Récupére via l'id:
router.get('/:id', auth, userCtrl.getUserProfil)

// Récupére tout:
//router.get('/', userCtrl .getAllPosts)

//////////////////////////////////////////////////////////////////////////////////////////////
// Exportation:
module.exports = router
