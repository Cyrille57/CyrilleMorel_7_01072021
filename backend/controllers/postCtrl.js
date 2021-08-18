///////////////////////////////////////////////
// Logique globale de l'application (post) ////
///////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////
// Importation :

// Fatest-validator: (validateur de saisie)
const Validator = require("fastest-validator");

// Model:
const Post = require('../models/post')
const User = require('../models/user')




//////////////////////////////////////////////////////////////////////////////////////////////
// CRUD:

// Créer un post :
exports.createPost = (req, res) => {

  console.log('INFO CREATEPOST:')
  console.log('REQ.BODY:')
  console.log(req.body)
  console.log('REQ.BODY.USERID:')
  console.log(req.body.userId)
  console.log('REQ.BODY.ADMIN:')
  console.log(req.body.admin)
  console.log('REQ.PARAMS:')
  console.log(req.params)
  console.log('REQ.PARAMS.ADMIN:')
  console.log(req.params.admin)

  const post = {
    userId: req.body.userId,
    content: req.body.content,
    attachment: req.body.attachment,
  }
  console.log('postCtrl, l43 post:')
  console.log(post)


  const schemaValidator = {
    content: {
      type: "string",
      optional: false,
      min: 2,
      max: 250
    }
  }

  const v = new Validator();
  const validationResponse = v.validate(post, schemaValidator)

  if (validationResponse !== true) {
    return res.status(400).json({
      message: "Validation échouée",
      errors: validationResponse
    })
  }

  // *****************************************************************************************
  // Code création:

  Post.create(post)
    .then((result) => {
      res.status(201).json({
        message: 'Votre post a correctement été ajouter!',
        post: result
      })
    })
    .catch((error) => {
      res.status(500).json({
        message: "Désolé, impossible d'ajouter votre post !",
        error: error
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
    .then(response => {
      console.log('Response:', response)
      return response.json();
    })
    .catch((error) =>
      res.status(400).json({
        message: "Désolé, votre message n'a pas pu être modifié",
        error: error
      })
    )
}

/*
where: {
      postId: req.params.id
    },
    include:[{ all: true, nested: true }]
    ,

*/

// Supprime le post:
exports.deletePost = (req, res) => {
  console.log('INFO delete req.body:')
  console.log(req.params)

  Post.findOne({
      where: {
        id: req.params.id,
      },
    include:[{ all: true, nested: true }]
    ,
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





/////////////////////////////////////////////////////////
//ESAIE

/*

exports.createPost = (req, res) => {

  //console.log('postCtrl createdPost l23 res:')
  //console.log(res)

  const {
    content,
    //attachment: req.body.attachment,
    UserId
  } = req.body
  //console.log('postCtrl createdPost l31 objet post:')
  //console.log(post)


console.log('postCtrl createdPost l35:')
console.log('REQ.BODY:')
console.log(req.body)
console.log('REQ.BODY.USERID:')
console.log(req.body.userId)
//console.log('REQ:')
//console.log(req.User.userId)
//console.log('post:')
//console.log(post)


model.findByPk({
  //attributes: ['id'],
		where: {id: req.query.id},
	})
  .then((user) => {

    console.log('postCtrl createdPost l121 user:')
    console.log(user)

    if (user !== null) {

      Post.create(post)
      .then((result) => {

        console.log('postCtrl createdPost l64 result:')
        console.log(result)

        res.status(201).json({
          message: 'Votre message a correctement été ajouter!',
          post: result
        })
      })
      .catch((error) => {

        console.log('postCtrl createdPost l75 error:')
        console.log(error)

        res.status(500).json({
          message: "Désolé, impossible d'ajouter votre message !",
        })
      })

    }

  })

}
*/



/////////////////////////////////////////////////////////
