///////////////////////////////////////////////////////////
// PostWall.js: ///////////////////////////////////////////
///////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////
// Connexion et récupération: valide


//---------------------------------------------------------
// Posts:


// Url pour recupérer les posts:
const urlPost = 'http://localhost:3000/api/posts'

// Fonction qui récupére les posts:
async function connectPost(urlPost) {

  let xhr = new XMLHttpRequest()

  xhr.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
      //xhr.setRequestHeader("Authorization", "Bearer {token}");
      var post = JSON.parse(this.responseText)
      console.log(post)

      post.reverse()

      displayAllPosts(post)
      displayUsername(post)


    } else if (this.readyState == XMLHttpRequest.DONE && this.status == 500) {
      console.log("Erreur 500")
    }
  }
  xhr.open("GET", urlPost, true)
  xhr.send()
}
connectPost(urlPost)


///////////////////////////////////////////////////////////
// Affiche l'input et envoie les posts: valide

function displayFormPost() {

  //---------------------------------------------------------
  // Création des éléments de base enfants:

  //Selectionne l'id parent:
  let main = document.querySelector('main')

  // Container:
  let divContainer = createTag('div') //
  addClass(divContainer, ['container'])

  // Row:
  let divRow = createTag('div') //
  addClass(divRow, ['row'])

  // Col-12
  let divCol = createTag('div') //
  addClass(divCol, ['col-12'])
  divCol.setAttribute('id', 'divCol')

  // Injecte dans le html:
  main.appendChild(divContainer)
  divContainer.appendChild(divRow)
  divRow.appendChild(divCol)

  //---------------------------------------------------------
  // Cadre Card Post:

  let divPostFrameCard = createTag('div')
  addClass(divPostFrameCard, ['post-frameCard'])

  let divSendPost = createTag('div')
  addClass(divSendPost, ['post-frameCard__send-post', 'shadow', 'rounded'])

  // Injecte dans le html:
  divCol.appendChild(divPostFrameCard)
  divPostFrameCard.appendChild(divSendPost)

  //---------------------------------------------------------
  // Formulaire Post:

  // Form:
  let postForm = createTag('form')
  addClass(postForm, ['post-frameCard__form'])
  postForm.setAttribute('id', 'postForm')

  // Input:
  let divInputPost = createTag('div')
  addClass(divInputPost, ['post-frameCard__input'])

  // Textarea:
  let textareaPost = createTag('textarea')
  addClass(textareaPost, ['shadow', 'rounded'])
  textareaPost.setAttribute('id', 'inputPost')
  textareaPost.setAttribute('name', 'post')
  textareaPost.setAttribute('type', 'text')
  textareaPost.setAttribute('rows', '2')
  textareaPost.setAttribute('placeholder', 'Un petit mot ?')
  textareaPost.required = true;

  // Frame Btn:
  let divBtnPost = createTag('div')
  addClass(divBtnPost, ['post-frameCard__frameBtn'])

  // Btn post:
  let btnPost = createTag('button')
  addClass(btnPost, ['post-frameCard__btn', 'btn--sendPost', 'shadow', 'rounded'])
  btnPost.setAttribute('type', 'button')
  btnPost.innerHTML = 'Post'

  // Icone Post:
  let iconPost = createTag('span')
  addClass(iconPost, ['fas', 'fa-paper-plane'])

  // Injecte dans le html:
  divSendPost.appendChild(postForm)
  postForm.appendChild(divInputPost)
  divInputPost.appendChild(textareaPost)
  postForm.appendChild(divBtnPost)
  divBtnPost.appendChild(btnPost)
  btnPost.appendChild(iconPost)

  //---------------------------------------------------------
  // Envoie le Post:

  btnPost.addEventListener('click', (event) => {
    event.preventDefault();

    let userId = sessionStorage.getItem('userId')
    console.log(userId)

    const urlSendPost = "http://localhost:3000/api/posts"

    let formData = {
      userId: userId,
      content: document.getElementById('inputPost').value
    }

    console.log(formData)
    var myInit = {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json;charset=UTF-8"
      }),
      body: JSON.stringify(formData),
      mode: 'cors',
      cache: 'default'
    };

    fetch(urlSendPost, myInit)
      .then(res => res.text()) // or res.json()
      .then(res => window.location.reload())

  })

}
displayFormPost()


///////////////////////////////////////////////////////////
// Affiche tous les posts: valide


function displayAllPosts(post) {

  for (let i = 0; i < post.length; i++) {

    let postLength = post.length
    sessionStorage.setItem("postLength", postLength)

    //---------------------------------------------------------
    // Cadre de la card qui affiche les posts et comments:

    // Selectionne l'id parent:
    let divCol = document.getElementById('divCol')

    // Card:
    let postAndComment = createTag('div')
    addClass(postAndComment, ['postAndComment'])
    postAndComment.setAttribute('id', 'postAndComment_' + post[i].id)

    // Frame de la card:
    let divReadPost = createTag('div')
    addClass(divReadPost, ['display-frameCard__read-post', 'shadow', 'rounded'])
    divReadPost.setAttribute('id', 'divReadPost')
    divReadPost.setAttribute('id', 'divReadPost_' + post[i].id)
    divReadPost.setAttribute('data-divReadPost', post[i].id)


    // Injecte dans le html:
    divCol.appendChild(postAndComment)
    postAndComment.appendChild(divReadPost)

    //---------------------------------------------------------
    // Intérieur de la card:

    // H2 Cadre Username:
    let divDisplayUsername = createTag('div')
    addClass(divDisplayUsername, ['display-frameCard__username'])

    //Username:
    let divUsername = createTag('h2')
    divUsername.setAttribute("id", "username_" + post[i].id)
    divUsername.setAttribute('data-idUsername', post[i].userId)

    // Cadre du displayPost:
    let divDisplayPost = createTag('div')
    addClass(divDisplayPost, ['display-frameCard__displayPost', 'shadow', 'rounded'])
    divDisplayPost.setAttribute('id', 'postComment_' + post[i].id)

    // Affichage du post:
    let divPost = createTag('p')
    divPost.innerHTML = post[i].content

    // Injecte dans le html:
    divReadPost.appendChild(divDisplayUsername)
    divDisplayUsername.appendChild(divUsername)
    divReadPost.appendChild(divDisplayPost)
    divDisplayPost.appendChild(divPost)

    //---------------------------------------------------------
    // PLacement des icones modifier et supprimer le post:

    // Cadre pour les 2 icones:
    let divPlaceIcon = createTag('div')
    addClass(divPlaceIcon, ['display-frameCard__icon-Modify-Delete-Post'])

    // Icone modifier post:
    let iconModifyPost = createTag('i') //
    addClass(iconModifyPost, ['fas', 'fa-reply']) //
    iconModifyPost.setAttribute('id', 'modifyPost') //
    iconModifyPost.setAttribute('data-bs-toggle', 'tooltip')
    iconModifyPost.setAttribute('data-bs-placement', 'right')
    iconModifyPost.setAttribute('title', 'Modifier')
    iconModifyPost.setAttribute('data-idModifyPost', post[i].id)

    // Récuoere l'id du post a modifier:
    const getIdModify = ('data-idModifyPost', post[i].id) //

    // Icone supprimer le post:
    let iconDeletePost = createTag('i')
    addClass(iconDeletePost, ['fas', 'fa-times-circle'])
    iconDeletePost.setAttribute('id', 'iconDeletePost')
    iconDeletePost.setAttribute('data-bs-toggle', 'tooltip')
    iconDeletePost.setAttribute('data-bs-placement', 'right')
    iconDeletePost.setAttribute('title', 'Supprimer')
    iconDeletePost.setAttribute('data-idDeletePost', post[i].id)

    // Récupére l'id du post a supprimer:
    deletePost(iconDeletePost)

    // Injecte dans le html:
    divDisplayPost.appendChild(divPlaceIcon)
    divPlaceIcon.appendChild(iconModifyPost)
    divPlaceIcon.appendChild(iconDeletePost)

    //---------------------------------------------------------
    // PLacement de la date du publication du post:

    // Cadre de la date:
    let divInfoDate = createTag('div')
    addClass(divInfoDate, ['display-frameCard__infoPost'])

    // Convertit la date:
    let convertsDate = new Date(post[i].createdAt);
    let dateFormat = (convertsDate.toLocaleString())

    // Date de publication:
    let pDate = createTag('p')
    pDate.innerHTML = dateFormat
    // Injecte dans le html:
    divReadPost.appendChild(divInfoDate)
    divInfoDate.appendChild(pDate)

    //---------------------------------------------------------
    // PLacement des bouton vue et editer un commentaire:

    // Cadre des boutons:
    let divFrameButton = createTag('div')
    addClass(divFrameButton, ['display-frameCard__option'])

    modifyPost(divReadPost, divDisplayPost, iconModifyPost, getIdModify, divFrameButton)

    // Bouton voir les commentaires:
    let btnLookComment = createTag('button')
    addClass(btnLookComment, ['display-frameCard__btn-lookComment', 'shadow', 'rounded'])
    btnLookComment.setAttribute('id', 'btnViewComment')
    btnLookComment.setAttribute('type', 'button')
    btnLookComment.setAttribute('data-lookComment', post[i].id)
    btnLookComment.innerHTML = 'Comment'
    const idViewComment = ('data-lookComment', post[i].id)
    sessionStorage.setItem("idViewComment", idViewComment)

    // Icone dans le bouton vue:
    let iconeViewComment = createTag('i')
    addClass(iconeViewComment, ['far', 'fa-eye'])

    // Bouton creer un commentaires:
    let btnEditComment = createTag('button')
    addClass(btnEditComment, ['display-frameCard__btn-sendComment', 'shadow', 'rounded'])
    btnEditComment.setAttribute('id', 'createComment')
    btnEditComment.setAttribute('type', 'button')
    btnEditComment.setAttribute('data-createComment', post[i].id)
    btnEditComment.innerHTML = 'Comment'
    createComment(post, divReadPost, btnEditComment, divDisplayPost, divFrameButton)

    // Icone dans le bouton edit:
    let iconeEditComment = createTag('i')
    addClass(iconeEditComment, ['far', 'fa-edit'])

    // Injecte dans le html:
    divReadPost.appendChild(divFrameButton)

    divFrameButton.appendChild(btnLookComment)
    btnLookComment.appendChild(iconeViewComment)

    divFrameButton.appendChild(btnEditComment)
    btnEditComment.appendChild(iconeEditComment)

    /*
    //---------------------------------------------------------
    // Affiche les commentaires:

    // Cadre affichage du commentaires:
    let divFrameReadComment = createTag('div')
    addClass(divFrameReadComment, ['display-frameCard__readComment'])

    // Affichage du comment:
    let pComment = createTag('p')

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
    iconModifyComment.setAttribute('data-idModifyComment', post[i].id)
    iconModifyComment.setAttribute('data-bs-toggle', 'tooltip')
    iconModifyComment.setAttribute('data-bs-placement', 'right')
    iconModifyComment.setAttribute('title', 'Modifier')

    // Icon delete comment:
    let iconDeleteComment = createTag('i')
    addClass(iconDeleteComment, ['fas', 'fa-times-circle'])
    iconDeleteComment.setAttribute('data-idDeleteComment', post[i].id)
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
    */
  }
}


///////////////////////////////////////////////////////////
// Affiche le username du post: a voir si valide quand auth en place


function displayUsername(post) {

  //console.log(post)

  //let postLength = sessionStorage.getItem("postLength")
  //console.log(postLength)

  for (let i = 0; i < post.length; i++) {

    // Récupe l'userId et l'ajoute a l'url des user:
    let findUrlUser = 'http://localhost:3000/api/users/' + post[i].userId
    //console.log(findUrlUser)
    // Sélectionne la ligne html ou username dois s'afficher:
    let username = document.getElementById("username_" + post[i].id)

    // Recuperation du username de l'user:
    let xhr = new XMLHttpRequest()

    xhr.onreadystatechange = function () {

      if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {

        var getUser = JSON.parse(this.responseText)

        // Injecte le username dans le html:
        username.innerHTML = getUser.username

      } else if (this.readyState == XMLHttpRequest.DONE && this.status == 500) {

        console.log("Erreur 500")
      }
    }

    xhr.open("GET", findUrlUser, true)

    xhr.send()
  }
}


///////////////////////////////////////////////////////////
// Fonction modifie le post: valide


function modifyPost(divReadPost, divDisplayPost, iconModifyPost, getIdModify, divFrameButton) {

  //Sélectionne l'icone modifier du post à modifier:
  //let getIconModifyPost = document.getElementById('modifyPost')

  // Ecoute l'icone de modify post:
  iconModifyPost.addEventListener('click', (event) => {

    //---------------------------------------------------------
    // Cache le post pour introduire le input pour update le post:
    divDisplayPost.style.display = 'none'
    divFrameButton.style.display = 'none'

    let formModify = createTag('form')
    addClass(formModify, ['d-flex', 'flex-column', 'justify-content-around', 'postForm'])

    let frameTextereaModifyPost = createTag('div')
    addClass(frameTextereaModifyPost, ['frameTextereaModifyPost', 'input-field'])
    returnModifyPost(frameTextereaModifyPost)

    let textareaModyfyPost = createTag('textarea')
    addClass(textareaModyfyPost, ['form-control', 'input-lg', 'p-text-area', 'shadow', 'rounded'])
    textareaModyfyPost.setAttribute('id', 'modifyPost')
    textareaModyfyPost.setAttribute('name', 'post')
    textareaModyfyPost.setAttribute('type', 'text')
    textareaModyfyPost.setAttribute('rows', '2')
    textareaModyfyPost.setAttribute('placeholder', 'On efface et on recommence ?')

    // Btn:
    let divBtnSendPostModify = createTag('button')
    addClass(divBtnSendPostModify, ['btn--sendPostModify', 'shadow', 'rounded', 'mt-3'])
    divBtnSendPostModify.setAttribute('id', 'btnSendPostModify')
    divBtnSendPostModify.setAttribute('type', 'button')
    divBtnSendPostModify.innerHTML = 'Mettre à jour'

    // Ecoute le bouton mettre à jour:
    divBtnSendPostModify.addEventListener('click', (event) => {

      //---------------------------------------------------------
      // Préparation de l'url pour la modification du post:

      // Recupere l'id du post:
      let getModify = document.getElementById('postAndComment_' + getIdModify)

      // Ajoute a l'url l'id du post:
      const url = "http://localhost:3000/api/posts/" + getIdModify

      //---------------------------------------------------------
      // Récupére la modification du post:

      function modifyFormData() {

        let postLength = sessionStorage.getItem("postLength")

        for (var i = 0; i < postLength.length; i++) {

          let formData = {
            id: getIdModify,
            content: textareaModyfyPost.value
          }
          console.log(formData)
          return formData
        }
      }

      //---------------------------------------------------------
      // Envoie la modification du post:

      var myInit = {
        method: "PUT",
        headers: new Headers({
          "Content-Type": "application/json;charset=UTF-8"
        }),
        body: JSON.stringify(modifyFormData()),
        mode: 'cors',
        cache: 'default'
      };

      fetch(url, myInit)
        .then(response => response.json())
        .then(res => document.location.reload())
        .catch(err => console.log(err))

    })

    // Injecte dans le html:
    divReadPost.appendChild(formModify)
    formModify.appendChild(frameTextereaModifyPost)
    frameTextereaModifyPost.appendChild(textareaModyfyPost)
    frameTextereaModifyPost.appendChild(divBtnSendPostModify)
    //frameTextereaModifyPost.appendChild(btnReturnReadPost)

  })

}


///////////////////////////////////////////////////////////
// Return posts: Valide

function returnModifyPost(frameTextereaModifyPost) {

  let btnReturnReadPost = createTag('button')
  addClass(btnReturnReadPost, ['btn--sendPostModify', 'shadow', 'shadow', 'rounded', 'my-3'])
  btnReturnReadPost.setAttribute('id', 'btnReturnReadPost')
  btnReturnReadPost.setAttribute('type', 'button')
  btnReturnReadPost.innerHTML = 'Retour'

  //---------------------------------------------------------
  // Ecoute le bouton retour:
  btnReturnReadPost.addEventListener('click', (event) => {
    document.location.reload()
  })

  frameTextereaModifyPost.appendChild(btnReturnReadPost)

}


///////////////////////////////////////////////////////////
// Delete Post: Valide


function deletePost(iconDeletePost) {

  // Ecoute l'icone delete:
  iconDeletePost.addEventListener('click', (event) => {

    event.preventDefault();

    // Cible l'icone du post
    let idDelete = event.target.getAttribute('data-idDeletePost')
    console.log(idDelete)

    // Récupére l'id du post:
    let getDelete = document.getElementById('postAndComment_' + idDelete)
    console.log(getDelete)

    //---------------------------------------------------------
    // Supprime le post coté front:
    getDelete.remove(idDelete)

    //---------------------------------------------------------
    // Supprime le post coté back:

    // Prépare l'url pour supprimer sur le backend:
    function getUrlDelete() {

      // Récupére la taille de post:
      let postLength = sessionStorage.getItem('postLength')

      for (var i = 0; i < postLength.length; i++) {
        const url = "http://localhost:3000/api/posts/" + idDelete
        return url
      }
    }
    getUrlDelete()

    // Supprime le post coté back:
    var myInit = {
      method: "DELETE"
    };

    // Envoie la requête cioté back:
    fetch(getUrlDelete(), myInit)
      .then(res => res.text()) // or res.json()
      .then(res => console.log(res))

  })

}


//---------------------------------------------------------
// Comments:


// Url pour recupérer les comments:
const urlComment = 'http://localhost:3000/api/comments'

// Fonction qui récupére les comments: Valide
async function connectComment() {

  console.log(urlComment)
  let xhr = new XMLHttpRequest()

  xhr.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
      //xhr.setRequestHeader("Authorization", "Bearer {token}");
      var comment = JSON.parse(this.responseText)
      console.log(comment)
      comment.reverse()

      displayAllComments(comment)
      //displayUsername(post)


    } else if (this.readyState == XMLHttpRequest.DONE && this.status == 500) {
      console.log("Erreur 500")
    }
  }
  xhr.open("GET", urlComment, true)
  xhr.send()
}
connectComment()


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

    // Cible le bouton edit comment pa  r rapport a l'id du post:
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



  /*
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
  */


}
createComment()


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
// Affiche tous les comments:


async function displayAllComments(comment) {

  let btnLookComment = document.getElementById('btnViewComment')
  console.log(btnLookComment)
  console.log(comment)

  btnLookComment.addEventListener('click', (event) => {
    console.log(event)

    //let idViewComment = event.target.getAttribute('data-lookComment')
    //console.log(idViewComment)

  })


/*
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

*/

}
displayAllComments(comment)

