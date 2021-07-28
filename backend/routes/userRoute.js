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

const admin = require('../middleware/authAdmin')

//////////////////////////////////////////////////////////////////////////////////////////////
// Routes:

// Signup:
router.post('/signup', userCtrl.signup)

// Login:
router.post('/login', userCtrl.login);

// Admin:
router.post('/admin', auth, userCtrl.getUserProfil)

// Récupére via l'id (dashboard):
//router.get('/dashboard/:id', auth, userCtrl.getUserProfil);

// Modifie le user:
router.put('/dashboard/:id', auth, userCtrl.modifyUser);

// Supprime le user:
//router.delete('/dashboard/:id', auth, userCtrl.deletePost);

// Récupére tout:
//router.get('/', userCtrl .getAllPosts)

//////////////////////////////////////////////////////////////////////////////////////////////
// Exportation:
module.exports = router
