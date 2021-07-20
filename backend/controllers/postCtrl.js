///////////////////////////////////////////////
// Logique globale de l'application (post) ////
///////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////
// Importation :

// Model message:
//const Message = require('../models/message');
//const Post = require('../models/message')

//////////////////////////////////////////////////////////////////////////////////////////////
// CRUD:
/*

// Création du message:
exports.createPost = (req, res, next) => {
console.log(req.body)
  const postObject = req.body.content;

  const post = Message.create({
    ...postObject,
  });
  post.save()
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

};
*/

function index(req, res) {
  const posts = "Posts list"
  res.send(posts);
}

module.exports = {
  index: index
}
