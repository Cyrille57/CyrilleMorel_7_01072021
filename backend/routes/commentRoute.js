///////////////////////////////////////////////
// Logique de routing comment: ////////////////
///////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////
// Importation :

// Framework Express:
const express = require('express')

// Création de gestionnaires de route modulaires:
const router = express.Router()

// PostController:
const commentCtrl = require('../controllers/commentCtrl')

// auth.js:
const auth = require('../middleware/auth')


//////////////////////////////////////////////////////////////////////////////////////////////
// Routes:

// Créer un comment:
router.post('/',  commentCtrl.createComment)

// Modifie le comment:
router.put('/:id', auth, commentCtrl.modifyComment)

// Supprime le comment:
router.delete('/:id', auth,  commentCtrl.deleteComment)

// Récupére via l'id:
router.get('/:id', commentCtrl.getOneComment)

// Récupére tout:
router.get('/', commentCtrl.getAllComments)

// Récupére les comment par rapport au post:
//router.get('/:id', commentCtrl.getAllCommentforOnePost)

//////////////////////////////////////////////////////////////////////////////////////////////
// Exportation:
module.exports = router
