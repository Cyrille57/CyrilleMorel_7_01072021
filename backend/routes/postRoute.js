///////////////////////////////////////////////
// Logique de routing post: ///////////////////
///////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////
// Importation :

// Framework Express:
const express = require('express');

// Création de gestionnaires de route modulaires:
const router = express.Router();

// PostController:
const postCtrl = require('../controllers/postCtrl');

router.get("/", postCtrl.index)
//////////////////////////////////////////////////////////////////////////////////////////////
// Routes:

// Création de post:
//router.post('/', postCtrl.createPost);
/*
// Récupération d'un post:
router.get('/:id', postController.getOnePost);

// Récupération de tous les posts:
router.get('/', postController.getAllPost);

// Modification de post:
router.put('/:id', postController.modifyPost);

// Suppresion de post:
router.delete('/:id', postController.deletePost);
*/
//////////////////////////////////////////////////////////////////////////////////////////////
// Exportation:

module.exports = router;
