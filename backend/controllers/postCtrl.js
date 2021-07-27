///////////////////////////////////////////////
// Logique globale de l'application (post) ////
///////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////
// Importation :

// Fatest-validator: (validateur de saisie)
const Validator = require("fastest-validator");

// Model:
const Post = require('../models/post')


//////////////////////////////////////////////////////////////////////////////////////////////
// CRUD:

// Créer un post :
exports.createPost = (req, res) => {

  const post = {
    content:    req.body.content,
    attachment: req.body.attachment,
    idUser:     118,
  }

  const schemaValidator = {
    content: {
      type:     "string",
      optional: false,
      min:      2,
      max:      250
    }
  }

  const v = new Validator();
  const validationResponse = v.validate(post, schemaValidator)

  if(validationResponse !== true){
    return res.status(400).json({
      message: "Validation échouée",
      errors: validationResponse
    })
  }

  Post.create(post)
    .then((result) => {
      res.status(201).json({
        message: 'Votre message a correctement été ajouter!',
        post: result,
      })
    })
    .catch((error) => {
      res.status(500).json({
        message: "Désolé, impossible d'ajouter votre message !",
        error: error,
      })
    })
}

// Modifie le post:
exports.modifyPost = (req, res) => {

  let postObject = {}

  postObject = {
    ...req.body,
  }

  // *****************************************************************************************
  // Vakidation des saisies utilisateur:
  const schemaValidator = {
    content: {
      type:     "string",
      optional: false,
      min:      2,
      max:      50
    }
  }

  const v = new Validator();
  const validationResponse = v.validate(postObject, schemaValidator)

  if(validationResponse !== true){
    return res.status(400).json({
      message: "Validation échouée",
      errors: validationResponse
    })
  }

  Post.update({
      _id: req.params.id,
      ...postObject
    },{
      where: {
        id: req.params.id,
      },

    })
    .then(() =>
      res.status(200).json({
        message: 'Votre message a correctement été modifié !',
      })
    )
    .catch((error) =>
      res.status(400).json({
        message: "Désolé, votre message n'a pas pu être modifié",
        error: error
      })
    )
}

// Supprime le post:
exports.deletePost = (req, res) => {

  Post.findOne({
    where: {
      id: req.params.id,
    },
  })
  .then((post) => {

    Post.destroy({
      where: {
        id: req.params.id,
      },
      })
      .then(() =>
        res.status(200).json({
          message: 'Votre message a correctement été supprimé !',
        })
      )
      .catch((error) =>
        res.status(400).json({
          error,
        })
      )

    })
    .catch((error) =>
      res.status(500).json({
        message: 'Désolé, votre message n\'a pas pu être supprimé !',
        error: error
      })
    )
}

// Récupére via l'id:
exports.getOnePost = (req, res) => {

  Post.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((post) => {
      if (post) {
        res.status(200).json(post)
      } else {
        res.status(404).json({
          message: 'Message introuvable !',
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
exports.getAllPosts = (req, res) => {

  Post.findAll()
    .then((post) => {
      res.status(200).json(post)
    })
    .catch((error) => {
      res.status(400).json({
        message: 'Désolés, les messages n\'ont pas pu être chargés',
        error: error
      })
    })
}
