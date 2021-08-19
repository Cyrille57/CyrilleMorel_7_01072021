///////////////////////////////////////////////////////////
// PostWall.js: ///////////////////////////////////////////
///////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////
// Connexion et récupération: valide



//---------------------------------------------------------
// Posts:


//---------------------------------------------------------
//token:

// récupére l'id de l'user:
var idUserConnect = parseInt(localStorage.getItem('infoUserId'))
console.log('idUserConnect:')
console.log(idUserConnect)

// Récupére le token:
var tokenConnect = localStorage.getItem('infoUserToken')
console.log(tokenConnect)

// Url pour recupérer les posts:
const urlPost = 'http://localhost:3000/api/posts'

// Fonction qui récupére les posts:
async function connectPost(urlPost) {

  let xhr = new XMLHttpRequest()

  xhr.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {

      var post = JSON.parse(this.responseText)
      //console.log('postWall l35 post:')
      //console.log(post)

      post.reverse()

      displayAllPosts(post)
      modifyPost(post)
      deletePost(post)
      displayUsername(post)


      for (var i = 0; i < post.length; i++) {
        var userIdPost = post[i].userId
        //console.log('postWall l44 userIdPost:')
        console.log(userIdPost)
      }

      sessionStorage.setItem("userIdPost", userIdPost)

    } else if (this.readyState == XMLHttpRequest.DONE && this.status == 500) {
      console.log("Erreur 500")
    }
  }
  xhr.open("GET", urlPost, true)
  xhr.setRequestHeader("Authorization", "Bearer " + tokenConnect)
  xhr.send()
}
connectPost(urlPost)

///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
// NavBar:

/*
function displayNavBar() {

  //Selectionne l'id parent:
   // header:
  let header = document.getElementById('header')
  console.log(header)

  // frame de la navbar:
  let frameNavBar = createTag('nav')
  addClass(frameNavBar, ['navbar', 'postWall-navbar'])

  // container de la navbar:
  let containerNavBar = createTag('div')
  addClass(containerNavBar, ['container', 'postWall-container'])

  // Injecte dans le html:
  header.appendChild(frameNavBar)
  frameNavBar.appendChild(containerNavBar)

  // frame logo:
  let frameLogo = createTag('div')
  addClass(frameLogo, ['postWall-frame-logo'])

  // lien du lmogo:
  let linkLogo = createTag('a')
  //addClass(linkLogo, [''])
  linkLogo.setAttribute('href', '../html/postWall.html')

  // image du logo:
  let logo = createTag('img')
  addClass(logo, ['postWall-logo-site'])
  logo.setAttribute('src', '../images/Logo Groupomania/icon-left-font-monochrome-black.png')
  logo.setAttribute('width', '35')
  logo.setAttribute('height', '35')
  logo.setAttribute('alt', 'Logo de Groupomania')

  // Injecte dans le html:
  containerNavBar.appendChild(frameLogo)
  frameLogo.appendChild(linkLogo)
  linkLogo.appendChild(logo)

  // frame ul:
  let frameUl = createTag('div')
  addClass(frameUl, ['postWall-frameUlNav'])

  // ul
  let ulNav = createTag('ul')
  addClass(ulNav, ['postWall-frameUlNav__ul'])

  // Injecte dans le html:
  containerNavBar.appendChild(frameUl)
  frameUl.appendChild(ulNav)

  // li vue profil:
  let liViewProfil = createTag('li')
  addClass(liViewProfil, ['postWall-linkProfil'])

  // lien de viewProfil:
  let linkViewProfil = createTag('a')
  linkViewProfil.setAttribute("href", "../html/vueProfil.html?id=" + idUserConnect)

  // icone vue profil:
  let iconeViewProfil = createTag('i')
  addClass(iconeViewProfil, ['fas', 'fa-user-circle', 'fa', 'postWall-linkProfil__icon'])

  // Injecte dans le html:
  ulNav.appendChild(liViewProfil)
  liViewProfil.appendChild(linkViewProfil)
  linkViewProfil.appendChild(iconeViewProfil)

  // li logout:
  let liLogOut = createTag('li')
  addClass(liLogOut, ['postWall-linkDeconnect'])

  // lien de logout:
  let linkLogout = createTag('a')
  //linkLogout.setAttribute('href', '../../index.html')
  linkLogout.setAttribute('id', 'logOut')

  // icone logOut:
  let iconeLogOut = createTag('i')
  addClass(iconeLogOut, ['fas', 'fa-sign-out-alt', 'fa', 'postWall-linkDeconnect__icon'])

  // Injecte dans le html:
  ulNav.appendChild(liLogOut)
  liLogOut.appendChild(linkLogout)
  linkLogout.appendChild(iconeLogOut)

  //---------------------------------------------------------
  // LogOut:

  // Sélectionne l'icone:
  let getLinkLogout = document.getElementById('logOut')
  console.log(getLinkLogout)

  // Ecoute le lien:
  getLinkLogout.addEventListener('click', (event) => {

    localStorage.removeItem('infoUserToken')
    localStorage.removeItem('infoUserId')
    location.href =  '../../index.html'
  })

}
displayNavBar()
*/

///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
// Affiche l'input et envoie les posts: OK


function displayFormPost() {
  //---------------------------------------------------------
  // Création des éléments de base enfants:

  //Selectionne l'id parent:
  let main = document.querySelector('main')
  console.log(main)
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

    const urlSendPost = "http://localhost:3000/api/posts"

    let formData = {
      userId: idUserConnect,
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

///////////////////////////////////////////////////////////
// Affiche tous les posts: OK


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
    divDisplayPost.setAttribute('id', 'displayPost_' + post[i].id)

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
    iconModifyPost.setAttribute('id', 'modifyPost_'+ post[i].id) //
    iconModifyPost.setAttribute('data-bs-toggle', 'tooltip')
    iconModifyPost.setAttribute('data-bs-placement', 'right')
    iconModifyPost.setAttribute('title', 'Modifier')
    iconModifyPost.setAttribute('data-idModifyPost', post[i].id)

    // Récuoere l'id du post a modifier:
    const getIdModify = ('data-idModifyPost', post[i].id) //

    // Icone supprimer le post:
    let iconDeletePost = createTag('i')
    addClass(iconDeletePost, ['fas', 'fa-times-circle'])
    iconDeletePost.setAttribute('id', 'deleteComment_' + post[i].id)
    iconDeletePost.setAttribute('data-bs-toggle', 'tooltip')
    iconDeletePost.setAttribute('data-bs-placement', 'right')
    iconDeletePost.setAttribute('title', 'Supprimer')
    iconDeletePost.setAttribute('data-idDeletePost', post[i].id)

    // Récupére l'id du post a supprimer:
    //deletePost(iconDeletePost)

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
    pDate.setAttribute('id', 'pDate_' + post[i].id)
    pDate.setAttribute('data-pDate', post[i].id)
    pDate.innerHTML = dateFormat

    // Injecte dans le html:
    divReadPost.appendChild(divInfoDate)
    divInfoDate.appendChild(pDate)

    //---------------------------------------------------------
    // PLacement des bouton vue et editer un commentaire:

    // Cadre des boutons:
    let divFrameButton = createTag('div')
    addClass(divFrameButton, ['display-frameCard__option'])
    divFrameButton.setAttribute('id', 'frameOption_' + post[i].id)

    modifyPost(divReadPost, divDisplayPost, iconModifyPost, getIdModify, divFrameButton)

    // Lien bouton voir commentaires:
    let linkView = createTag('a')
    addClass(linkView, ['button'])
    linkView.setAttribute('id', 'btnViewComment')
    linkView.setAttribute("href", "../html/viewComment.html?id=" + post[i].id)
    linkView.setAttribute('data-viewComment', post[i].id)
    linkView.innerHTML = 'Comment'

    const idViewComment = ('data-viewComment', post[i].id)
    sessionStorage.setItem("idViewComment", idViewComment)
    const idView = ('data-lookComment', post[i].id)
    sessionStorage.setItem("idView", idView)

    // Icone dans le bouton vue:
    let iconeViewComment = createTag('i')
    addClass(iconeViewComment, ['far', 'fa-eye'])

    // Lien bouton editer commentaires:
    let linkEdit = createTag('a')
    addClass(linkEdit, ['button'])
    linkEdit.setAttribute('id', 'btnEditComment')
    linkEdit.setAttribute("href", "../html/editComment.html?id=" + post[i].id)
    linkEdit.setAttribute('data-editComment', post[i].id)
    linkEdit.innerHTML = 'Comment'

    //createComment(post, divReadPost, btnEditComment, divDisplayPost, divFrameButton)

    // Icone dans le bouton edit:
    let iconeEditComment = createTag('i')
    addClass(iconeEditComment, ['far', 'fa-edit'])

    // Injecte dans le html:
    divReadPost.appendChild(divFrameButton)

    // Bouton voir commentaire:
    divFrameButton.appendChild(linkView)
    linkView.appendChild(iconeViewComment)

    // Bouton editer commentaire:
    divFrameButton.appendChild(linkEdit)
    linkEdit.appendChild(iconeEditComment)

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

///////////////////////////////////////////////////////////
// Affiche le username du post: OK


function displayUsername(post) {
  //console.log(post)

  for (let i = 0; i < post.length; i++) {

    //Sélectionne le h2 du comment correspondant:
    let hUsername = document.getElementById('username_' + post[i].id)
    //console.log(hUsername)

    // Récupe l'userId et l'ajoute a l'url des user:
    let findUrlUser = 'http://localhost:3000/api/users/' + post[i].userId
    //console.log(findUrlUser)

    fetch(findUrlUser)
      .then(response => response.json())
      .then(data => {

        hUsername.innerHTML = data.username

      })

  }

}
displayUsername()


///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
// Fonction modifie le post: --


function modifyPost(post) {

  for (let i = 0; i < post.length; i++) {

    // Sélectionne l'icone modify du post correspondant:
    let iconmodifyPost = document.getElementById('modifyPost_' + post[i].id)
    console.log(iconmodifyPost)

    iconmodifyPost.addEventListener('click', (event) => {
      event.preventDefault();
      console.log(iconmodifyPost)

      //---------------------------------------------------------
      // Autorisation:

      // Sélectionne l'auteur du post:
      let getIdAuthor = post[i].userId
      console.log(getIdAuthor)

      // Si auteur autorisé sinon non:
      if (idUserConnect != getIdAuthor) {
        console.log('désolé')
      } else {

        //---------------------------------------------------------
        // Sélectionne:

        // le post:
        let displayPost = document.getElementById('displayPost_' + post[i].id)
        console.log(displayPost)

        // info date:
        let pDate = document.getElementById('pDate_' + post[i].id)
        console.log(pDate)

        let readComment = document.getElementById('divReadPost_' + post[i].id)
        console.log(readComment)

        let frameOption = document.getElementById('frameOption_' + post[i].id)
        console.log(frameOption)

        let postAndComment = document.getElementById('postAndComment_' + post[i].id)
        console.log(postAndComment)

        // Récuoere l'id du post a modifier:
        const getIdModify = ('data-idModifyPost', post[i].id)

        //---------------------------------------------------------
        // Cache le post pour introduire le input pour update le post:
        displayPost.style.display = 'none'
        pDate.style.display = 'none'
        frameOption.style.display = 'none'

        let formModify = createTag('form')
        addClass(formModify, ['d-flex', 'flex-column', 'justify-content-around', 'postForm'])

        let frameTextereaModifyComment = createTag('div')
        addClass(frameTextereaModifyComment, ['frameTextereaModifyPost', 'input-field'])
        //returnModifyComment(frameTextereaModifyComment)

        let textareaModyfyPost = createTag('textarea')
        addClass(textareaModyfyPost, ['form-control', 'input-lg', 'p-text-area', 'shadow', 'rounded'])
        textareaModyfyPost.setAttribute('id', 'modifyPost')
        textareaModyfyPost.setAttribute('name', 'post')
        textareaModyfyPost.setAttribute('type', 'text')
        textareaModyfyPost.setAttribute('rows', '2')
        textareaModyfyPost.setAttribute('placeholder', 'On efface et on recommence ?')

        readComment.appendChild(formModify)
        formModify.appendChild(frameTextereaModifyComment)
        frameTextereaModifyComment.appendChild(textareaModyfyPost)

        // Btn:
        let divBtnSendPostModify = createTag('button')
        addClass(divBtnSendPostModify, ['btn--sendPostModify', 'shadow', 'rounded', 'mt-3'])
        divBtnSendPostModify.setAttribute('id', 'btnSendPostModify')
        divBtnSendPostModify.setAttribute('type', 'button')
        divBtnSendPostModify.innerHTML = 'Mettre à jour'

        // Ecoute le bouton mettre à jour:
        divBtnSendPostModify.addEventListener('click', (event) => {

           //---------------------------------------------------------
          // Préparation de l'url pour la modification du comment:

          // Recupere l'id du post:
          let getModify = document.getElementById('postAndComment_' + getIdModify)
          console.log('ModifyPost l512 getModify :')
          console.log(getModify)
          // Ajoute a l'url l'id du post:
          const url = "http://localhost:3000/api/posts/" + getIdModify
          console.log('ModifyPost l515 url:')
          console.log(url)

          //---------------------------------------------------------
          // Récupére la modification du post:

          function modifyFormData() {

            for (var i = 0; i < post.length; i++) {

              let formData = {
                id: getIdModify,
                userId: idUserConnect,
                content: textareaModyfyPost.value
              }
              console.log(formData)
              return formData
            }
          }
          modifyFormData()

          //---------------------------------------------------------
          // Envoie la modification du post:

          var myInit = {
            method: "PUT",
            headers: new Headers({
              "Content-Type": "application/json;charset=UTF-8",
              "Authorization": 'Bearer ' + tokenConnect
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

        // Injecte dans le html:
        readComment.appendChild(formModify)
        formModify.appendChild(frameTextereaModifyComment)
        frameTextereaModifyComment.appendChild(textareaModyfyPost)
        frameTextereaModifyComment.appendChild(divBtnSendPostModify)
        //frameTextereaModifyComment.appendChild(btnReturnReadPost)








      }



    })











  }
}
modifyPost()


///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
// Return posts:


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

}


///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
// Delete Post: OK


function deletePost(post) {

  for (let i = 0; i < post.length; i++) {

    // Sélectionne l'icone delete du post correspondant:
    let getDelete = document.getElementById('deleteComment_' + post[i].id)
    //console.log(getDelete)

    // Ecoute l'icone delete:
    getDelete.addEventListener('click', (event) => {
      //console.log(post)
      event.preventDefault();

      // Cible l'icone du comment:
      let getIdDelete = event.target.getAttribute('data-idDeletePost')
      //console.log(getIdDelete)

      // Sélectionne l'id du post:
      let getIdPost = document.getElementById('postAndComment_' + post[i].id)
      //console.log(getIdPost)

      //---------------------------------------------------------
      // Autorisation:

      // Sélectionne l'auteur du post:
      let getIdAuthor = post[i].userId
      //console.log(getIdAuthor)

      // Si auteur autorisé sinon non:
      if (idUserConnect != getIdAuthor) {
        //console.log('désolé')
      } else {
        //console.log('ok')

        //---------------------------------------------------------
        // Supprime le post coté front:
        getIdPost.remove(getIdDelete)

        //---------------------------------------------------------
        // Supprime le post coté back:

        // Prépare l'url pour supprimer sur le backend:
        function getUrlDelete() {

          for (var i = 0; i < post.length; i++) {
            const url = "http://localhost:3000/api/posts/" + getIdDelete
            //console.log('postWall.js delePost l640 url a suppr:')
            //console.log(url)
            return url
          }
        }
        getUrlDelete()

        // Envoie la requête:
        var myInit = {
          headers: {
            'Authorization': 'Bearer ' + tokenConnect
          },
          method: "DELETE"
        };
        //console.log('postWall.js delePost l653 myInit:')
        //console.log(myInit)

        // Envoie la requête cioté back:
        fetch(getUrlDelete(), myInit)
          .then(res => res.json())
          .then(res => console.log(res))
      }

    })

  }
}
getUrlDelete()


///////////////////////////////////////////////////////////
