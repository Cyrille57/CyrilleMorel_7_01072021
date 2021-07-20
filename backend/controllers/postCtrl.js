///////////////////////////////////////////////
// Logique globale de l'application (post) ////
///////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////
// Importation :

// Model:
const models= require('../models')

//////////////////////////////////////////////////////////////////////////////////////////////
// CRUD:


function save(req, res){
  const post = {
    idUsers : 1,
    content: req.body.content,
    attachment: req.body.attachment,
    likes: req.body.likes
  }

  models.Post.create(post)
  .then(result => {
    res.status(201).json({
      message: 'Votre message a correctement été ajouter!',
      post: result
    });
  })
.catch(error => {
    res.status(500).json({
      message: 'Quelque chose c\'est mal passé !',
      error : error
    });
  });

}

module.exports = {
  save: save
}

