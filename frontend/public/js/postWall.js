///////////////////////////////////////////////////////////
// PostWall.js: ///////////////////////////////////////////
///////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////
// Connexion et récupération:


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

      for (var i = 0; i < post.length; i++) {
        var postId = post[i].id
        var postContent = post[i].content
        var userId = post[i].userId
        var createdAt = post[i].createdAt
      }
      sessionStorage.setItem("post", post)
      sessionStorage.setItem("userId", userId)

      displayAllPosts(post, postId, postContent, createdAt)


    } else if (this.readyState == XMLHttpRequest.DONE && this.status == 500) {
      console.log("Erreur 500")
    }
  }
  xhr.open("GET", urlPost, true)
  xhr.send()
}
connectPost(urlPost)


//---------------------------------------------------------
// Users:


// Url pour recupérer les users:
const urlUser = 'http://localhost:3000/api/users'


// Fonction qui récupére les users:
async function connectUser(urlUser) {
  //console.log(urlUser)
  let xhr = new XMLHttpRequest()

  xhr.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
      //xhr.setRequestHeader("Authorization", "Bearer {token}");
      var user = JSON.parse(this.responseText)
      //user.reverse()

      for (var i = 0; i < user.length; i++) {
        var userId = user[i].id
        var userUsername = user[i].username
        var userAdmin = user[i].admin
      }

      displayUsername(userUsername)

    } else if (this.readyState == XMLHttpRequest.DONE && this.status == 500) {
      console.log("Erreur 500")
    }
  }
  xhr.open("GET", urlUser, true)
  xhr.send()
}
connectUser(urlUser)


///////////////////////////////////////////////////////////
// Affiche l'input et envoie les posts:

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
    //.then(res => window.location.reload())

  })

}
displayFormPost()


///////////////////////////////////////////////////////////
// Affiche tous les posts:


function displayAllPosts(post, postId, postContent, createdAt) {

  for (let i = 0; i < post.length; i++) {

    console.log(post.length)
    let postLength = post.length
    sessionStorage.setItem("postLength", postLength)


    //---------------------------------------------------------
    // Cadre de la card qui affiche les posts et comments:

    // Selectionne l'id parent:
    let divCol = document.getElementById('divCol')

    // Boucle le nombre de card par rapport au posts trouvé:


    // Card:
    let postAndComment = createTag('div')
    addClass(postAndComment, ['postAndComment'])
    postAndComment.setAttribute('id', 'postAndComment_' + postId)
    console.log('postAndComment_' + postId)
    console.log(postId)

    // Frame de la card:
    let divReadPost = createTag('div')
    addClass(divReadPost, ['display-frameCard__read-post', 'shadow', 'rounded'])

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
    divUsername.setAttribute("id", "username_" + postId)
    divUsername.setAttribute('data-idUsername', postId)
    // Récuoere l'id du post:
    const getIdUsername = ("data-idUsername", postId)
    // Envoie dans sessionStorage pour la récupérer dans la fonction DisplayUsername:
    sessionStorage.setItem("getIdUsername", getIdUsername);

    // Cadre du displayPost:
    let divDisplayPost = createTag('div')
    addClass(divDisplayPost, ['display-frameCard__displayPost', 'shadow', 'rounded'])

    // Affichage du post:
    let divPost = createTag('p')
    divPost.innerHTML = postContent

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
    iconModifyPost.setAttribute('data-idModifyPost', postId) //
    console.log(postId)
    // Récuoere l'id du post a modifier:
    const getIdModify = ("data-idModifyPost", postId) //
    console.log(getIdModify)
    //modifyPost(divDisplayPost, iconModifyPost, getIdModify, divFrameButton)
    sessionStorage.setItem("getIdModify", getIdModify)

    // Icone suppirmer le post:
    let iconDeletePost = createTag('i')
    addClass(iconDeletePost, ['fas', 'fa-times-circle'])
    iconDeletePost.setAttribute('data-idDeletePost', postId)
    iconDeletePost.setAttribute('data-bs-toggle', 'tooltip')
    iconDeletePost.setAttribute('data-bs-placement', 'right')
    iconDeletePost.setAttribute('title', 'Supprimer')

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
    let convertsDate = new Date(createdAt);
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
    btnLookComment.setAttribute('type', 'button')
    btnLookComment.setAttribute('data-lookComment', postId)
    btnLookComment.innerHTML = 'Comment'

    // Icone dans le bouton vue:
    let iconeViewComment = createTag('i')
    addClass(iconeViewComment, ['far', 'fa-eye'])

    // Bouton creer un commentaires:
    let btnEditComment = createTag('button')
    addClass(btnEditComment, ['display-frameCard__btn-sendComment', 'shadow', 'rounded'])
    btnEditComment.setAttribute('type', 'button')
    btnEditComment.setAttribute('data-createComment', postId)
    btnEditComment.innerHTML = 'Comment'

    // Icone dans le bouton edit:
    let iconeEditComment = createTag('i')
    addClass(iconeEditComment, ['far', 'fa-edit'])

    // Injecte dans le html:
    divReadPost.appendChild(divFrameButton)

    divFrameButton.appendChild(btnLookComment)
    btnLookComment.appendChild(iconeViewComment)

    divFrameButton.appendChild(btnEditComment)
    btnEditComment.appendChild(iconeEditComment)

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
    iconModifyComment.setAttribute('data-idModifyComment', postId)
    iconModifyComment.setAttribute('data-bs-toggle', 'tooltip')
    iconModifyComment.setAttribute('data-bs-placement', 'right')
    iconModifyComment.setAttribute('title', 'Modifier')

    // Icon delete comment:
    let iconDeleteComment = createTag('i')
    addClass(iconDeleteComment, ['fas', 'fa-times-circle'])
    iconDeleteComment.setAttribute('data-idDeleteComment', postId)
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
  }
}
displayAllPosts()


///////////////////////////////////////////////////////////
// Affiche le username du post:


function displayUsername(userUsername) {

  console.log(userUsername)

  let postLength = sessionStorage.getItem("postLength")
  console.log(postLength)

  for (let i = 0; i < postLength.length; i++) {
    
    // Récupére l'id du post:
    let getIdUsername = sessionStorage.getItem("getIdUsername")
    console.log(getIdUsername)
    // Récupére l'id du username en fonction de l'id du post:
    let getUsername = document.getElementById('username_' + getIdUsername)
    console.log(getUsername)

    // Injecte le username dans le html:
    getUsername.innerHTML = userUsername
  }
}
displayUsername(userUsername)


///////////////////////////////////////////////////////////
// Fonction modifie le post:


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

    let textareaModyfyPost = createTag('textarea')
    addClass(textareaModyfyPost, ['form-control', 'input-lg', 'p-text-area', 'shadow', 'rounded'])
    textareaModyfyPost.setAttribute('id', 'modifyPost')
    textareaModyfyPost.setAttribute('name', 'post')
    textareaModyfyPost.setAttribute('type', 'text')
    textareaModyfyPost.setAttribute('rows', '2')
    textareaModyfyPost.setAttribute('placeholder', 'On efface et on recommence ?')

    console.log(textareaModyfyPost)
    console.log(textareaModyfyPost.value)

    // Btn:
    let divBtnSendPostModify = createTag('button')
    addClass(divBtnSendPostModify, ['btn--sendPostModify', 'shadow', 'rounded', 'mt-3'])
    divBtnSendPostModify.setAttribute('id', 'btnSendPostModify')
    divBtnSendPostModify.setAttribute('type', 'button')
    divBtnSendPostModify.innerHTML = 'Mettre à jour'

    // Injecte dans le html:
    divReadPost.appendChild(formModify)
    formModify.appendChild(frameTextereaModifyPost)
    frameTextereaModifyPost.appendChild(textareaModyfyPost)
    frameTextereaModifyPost.appendChild(divBtnSendPostModify)
    //frameTextereaModifyPost.appendChild(btnReturnReadPost)

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
        console.log(document.getElementById('modifyPost').value)

        for (var i = 0; i < postLength.length; i++) {
          let formData = {
            id: getIdModify,
            content: document.getElementById('modifyPost').value
          }
          console.log(formData)
          return formData
        }
      }
      //modifyFormData()

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
        //.then(res => document.location.reload())
        .catch(err => console.log(err))
    })

  })

}



