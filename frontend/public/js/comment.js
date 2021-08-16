///////////////////////////////////////////////////////////
// Comment.js: ///////////////////////////////////////////
///////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////
// Récuére l'id et la concaténe avec l'ulr comment;


//---------------------------------------------------------
// Récupére l'id dans l'url:
const getIdUrl = window.location.search

//---------------------------------------------------------
// Purge getIdUrl de ?id= et recupere  l'id :

// Analyser les paramètres de la chaîne de requête:
const getUrlParams = new URLSearchParams(getIdUrl);

// retournera la première valeur associée au paramètre de recherche donné:
const getId = getUrlParams.get('id')

//---------------------------------------------------------
// Concaténe l'url de l'API avec l'id récupéré et filtré:

const url = "http://localhost:3000/api/comments";
const urlComment = url + "/" + getId;
console.log(urlComment)


///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
// Connexion:


// Fonction qui récupére les comments: Valide
async function connectComment(urlComment) {

  console.log(urlComment)
  let xhr = new XMLHttpRequest()

  xhr.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
      //xhr.setRequestHeader("Authorization", "Bearer {token}");
      var comment = JSON.parse(this.responseText)
      console.log(comment)
      comment.reverse()

    } else if (this.readyState == XMLHttpRequest.DONE && this.status == 500) {
      console.log("Erreur 500")
    }
  }
  xhr.open("GET", urlComment, true)
  xhr.send()
}
connectComment(urlComment)


///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
// Crér un commentaire: Valide


function createComment(post, divReadPost, btnEditComment, divDisplayPost, divFrameButton) {


  btnEditComment.addEventListener('click', (event) => {
    console.log(event)

    //---------------------------------------------------------
    // Affiche l'input pour écrire le commentaire:

    // Cache le post pour introduire le input pour écrire le commentaire:
    divDisplayPost.style.display = 'none'
    divFrameButton.style.display = 'none'

    let formcretaComment = createTag('form')
    addClass(formcretaComment, ['d-flex', 'flex-column', 'justify-content-around', 'postForm'])

    let frameTextereaCreateComment = createTag('div')
    addClass(frameTextereaCreateComment, ['frameTextereaModifyPost', 'input-field'])
    //returnModifyPost(frameTextereaCreateComment)

    let textareaCreateComment = createTag('textarea')
    addClass(textareaCreateComment, ['form-control', 'input-lg', 'p-text-area', 'shadow', 'rounded'])
    textareaCreateComment.setAttribute('id', 'createComment')
    textareaCreateComment.setAttribute('name', 'post')
    textareaCreateComment.setAttribute('type', 'text')
    textareaCreateComment.setAttribute('rows', '2')
    textareaCreateComment.setAttribute('placeholder', 'Un ptit commentaire ?')

    // Btn:
    let divBtnCreateComment = createTag('button')
    addClass(divBtnCreateComment, ['btn--sendPostModify', 'shadow', 'rounded', 'mt-3'])
    divBtnCreateComment.setAttribute('id', 'btnCreateComment')
    divBtnCreateComment.setAttribute('type', 'button')
    divBtnCreateComment.innerHTML = 'Envoyer'

    //---------------------------------------------------------
    // Envoie le commentaire:

    // Cible le bouton edit comment par rapport a l'id du post:
    let idCreateComment = event.target.getAttribute('data-createComment')
    console.log(idCreateComment)

    // Function qui créer l'objet a envoyer:
    function prepareTheComment() {

      for (var i = 0; i < post.length; i++) {

        let formData = {
          userId: post[i].userId,
          postId: idCreateComment,
          content: textareaCreateComment.value
        }
        return formData
      }
    }

    // Ecoute le btn envoyer:
    divBtnCreateComment.addEventListener('click', (event) => {
      console.log(event)

      prepareTheComment()

      const url = "http://localhost:3000/api/comments"

      var myInit = {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json;charset=UTF-8"
        }),
        body: JSON.stringify(prepareTheComment()),
        mode: 'cors',
        cache: 'default'
      };

      fetch(url, myInit)
        .then(res => res.text())
        //.then(res => document.location.reload())
        .catch(err => console.log(err))

    })

    divReadPost.appendChild(formcretaComment)
    formcretaComment.appendChild(frameTextereaCreateComment)
    frameTextereaCreateComment.appendChild(textareaCreateComment)
    frameTextereaCreateComment.appendChild(divBtnCreateComment)

    returnCreateComment(frameTextereaCreateComment)
  })




    const url = "http://localhost:3000/api/comments"

    var myInit = {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json;charset=UTF-8"
      }),
      body: JSON.stringify(prepareTheComment()),
      mode: 'cors',
      cache: 'default'
    };


    fetch(url , myInit)
      .then(response => response.json())
      //.then(res => document.location.reload())
      .catch(err => console.log(err))



}
//createComment()
/*

///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
// Return posts: Valide


function returnCreateComment(frameTextereaCreateComment) {

  let btnReturndPost = createTag('button')
  addClass(btnReturndPost, ['btn--sendPostModify', 'shadow', 'shadow', 'rounded', 'my-3'])
  btnReturndPost.setAttribute('id', 'btnReturnReadPost')
  btnReturndPost.setAttribute('type', 'button')
  btnReturndPost.innerHTML = 'Retour'

  //---------------------------------------------------------
  // Ecoute le bouton retour:
  btnReturndPost.addEventListener('click', (event) => {
    document.location.reload()
  })

  frameTextereaCreateComment.appendChild(btnReturndPost)

}


///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
// Affiche tous les comments du post:


 function displayAllComments(comment) {

  // Sélectionne le bouton voir commentaires:
  let btnLookComment = document.getElementById('btnViewComment')
  console.log(btnLookComment)

  // Ecoute le bouton:
  btnLookComment.addEventListener('click', (event) => {
    console.log(event)

    console.log(comment.postId)
    //---------------------------------------------------------
    // Préparation de l'url pour l'affichage du comment:

    // Cible l'id du post ou es attaché le bouton:
    let idViewComment = event.target.getAttribute('data-lookComment')
    console.log(idViewComment)


    // Ajoute a l'url l'id du post:
    const getAllCommentforOnePost = "http://localhost:3000/api/comments/" + idViewComment
    console.log(getAllCommentforOnePost)

    //---------------------------------------------------------
    // Récupére les commentaires du post:

    async function connectCommentforOnePost(getAllCommentforOnePost) {
      // Recuperation du username de l'user:
      let xhr = new XMLHttpRequest()

      xhr.onreadystatechange = function () {

        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {

          var getCommentForOnePost = JSON.parse(this.responseText)
          console.log(getCommentForOnePost)

        } else if (this.readyState == XMLHttpRequest.DONE && this.status == 500) {

          console.log("Erreur 500")
        }
      }

      xhr.open("GET", getAllCommentforOnePost, true)
      xhr.send()
    }
    connectCommentforOnePost(getAllCommentforOnePost)

  })



  //btnLookComment, divReadPost


  //console.log(comment)
  // Récupére l'id du bouton voir les commentaires
  // btnLookComment.addEventListener('click', (event) => {
  //console.log(event)

  // Récupére l'id du bouton comment:
  let idViewComment = sessionStorage.getItem("idViewComment")
  console.log(idViewComment)

  function getUrlViewComment() {

    const url = "http://localhost:3000/api/comments" + idViewComment
    console.log(url)
    return url
  }
  getUrlViewComment()

  // Recupere la modification du post:
  function modifyFormData() {
    for (var i = 0; i < result.length; i++) {
      let formData = {
        id:     comment[i].id ,
        postid: idViewComment,
        content: document.getElementById('modifyPost').value
      }
      return formData
    }
  }

  //for (let i = 0; i < comment.length; i++) {
  //console.log(comment[i].content)
  //console.log(comment)

        //---------------------------------------------------------
        // Affiche les commentaires:

        // Cadre affichage du commentaires:
        let divFrameReadComment = createTag('div')
        addClass(divFrameReadComment, ['display-frameCard__readComment'])

        // Affichage du comment:
        let pComment = createTag('p')
        pComment.setAttribute('id', 'pComment')
        pComment.innerHTML = comment[i].content

        let divReadPost = document.getElementById('divReadPost')
        console.log(divReadPost)

        console.log(divReadPost)
        // Injecte dans le html:
        divReadPost.appendChild(divFrameReadComment)
        divFrameReadComment.appendChild(pComment)

        //---------------------------------------------------------
        // Emplacement des boutons:

        // Cadre des boutons:
        let divFrameButtonComment = createTag('div')
        addClass(divFrameButtonComment, ['display-frameCard__icon-Modify-Delete-Comment'])

        // Icon modify comment:
        let iconModifyComment = createTag('i')
        addClass(iconModifyComment, ['fas', 'fa-reply'])
        iconModifyComment.setAttribute('data-idModifyComment', comment[i].id)
        iconModifyComment.setAttribute('data-bs-toggle', 'tooltip')
        iconModifyComment.setAttribute('data-bs-placement', 'right')
        iconModifyComment.setAttribute('title', 'Modifier')

        // Icon delete comment:
        let iconDeleteComment = createTag('i')
        addClass(iconDeleteComment, ['fas', 'fa-times-circle'])
        iconDeleteComment.setAttribute('data-idDeleteComment', comment[i].id)
        iconDeleteComment.setAttribute('data-bs-toggle', 'tooltip')
        iconDeleteComment.setAttribute('data-bs-placement', 'right')
        iconDeleteComment.setAttribute('title', 'Supprimer')

        // Injecte dans le html:
        divFrameReadComment.appendChild(divFrameButtonComment)
        divFrameButtonComment.appendChild(iconModifyComment)
        divFrameButtonComment.appendChild(iconDeleteComment)

        //---------------------------------------------------------
        // Emplacement des boutons:

        // Cadre pour username et date:
        let divFrameInfoComment = createTag('div')
        addClass(divFrameInfoComment, ['display-frameCard__infoComment'])

        // Username du comment:
        let usernameComment = createTag('h2')

        // Date du comment:
        let dateComment = createTag('p')

        // Injecte dans le html:
        divFrameReadComment.appendChild(divFrameInfoComment)
        divFrameInfoComment.appendChild(usernameComment)
        divFrameInfoComment.appendChild(dateComment)

  //}

  //})



}
displayAllComments(comment)

*/

