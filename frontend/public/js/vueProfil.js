///////////////////////////////////////////////////////////
// vueProfil.js: ////////////////////////////////////////
///////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////
// Récupére l'id et la concaténe avec l'ulr comment;

//---------------------------------------------------------
// Récupére l'id dans l'url:
const getIdUserUrl = window.location.search

//---------------------------------------------------------
// Purge getIdUrl de ?id= et recupere  l'id :

// Analyser les paramètres de la chaîne de requête:
const getUrlParams = new URLSearchParams(getIdUserUrl);
//console.log(getUrlParams)

// Recupére l'id du post:
const getIdUser = parseInt(getUrlParams.get('id'))
console.log('id du user:')
console.log(getIdUser)

//---------------------------------------------------------
// Url de comments:

const urlUser = "http://localhost:3000/api/users/" + getIdUser;
console.log(urlUser)

//---------------------------------------------------------
//token:

// récupére l'id de l'user:
var idUserConnect = parseInt(localStorage.getItem('infoUserId'))
console.log('idUserConnect:')
console.log(idUserConnect)

// Récupére le token:
var tokenConnect = localStorage.getItem('infoUserToken')
//console.log(tokenConnect)

///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
// Connexion: OK


// Fonction qui récupére le comments:

async function connectUser(urlUser) {

  //console.log(urlComment)
  let xhr = new XMLHttpRequest()
  //console.log(xhr)

  xhr.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {

      var user = JSON.parse(this.responseText)
      //console.log('comment l35 comment:')
      console.log(user)
      displayNavBar(user)
      displayUser(user)

    } else if (this.readyState == XMLHttpRequest.DONE && this.status == 500) {
      console.log("Erreur 500")
    }
  }
  xhr.open("GET", urlUser, true)
  xhr.setRequestHeader("Authorization", "Bearer " + tokenConnect)
  xhr.send()
}
connectUser(urlUser)

///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
// NavBar:

function displayNavBar(user) {

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
  linkLogout.setAttribute('href', '../../index.html')

  // icone logOut:
  let iconeLogOut = createTag('i')
  addClass(iconeLogOut, ['fas', 'fa-sign-out-alt', 'fa', 'postWall-linkDeconnect__icon'])

  // Injecte dans le html:
  ulNav.appendChild(liLogOut)
  liLogOut.appendChild(linkLogout)
  linkLogout.appendChild(iconeLogOut)

}

///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
// Affiche de l'user:

function displayUser(user) {

  //---------------------------------------------------------
  // Création des éléments de base enfants:

  //Selectionne l'id parent:
  let main = document.querySelector('main')

  // Container:
  let divContainerUser = createTag('div')
  addClass(divContainerUser, ['container'])

  // Row:
  let divRow = createTag('div') //
  addClass(divRow, ['row'])

  // Col-12
  let divCol = createTag('div') //
  addClass(divCol, ['col-12'])
  divCol.setAttribute('id', 'divCol')

  // Injecte dans le html:
  main.appendChild(divContainerUser)
  divContainerUser.appendChild(divRow)
  divRow.appendChild(divCol)

  //---------------------------------------------------------
  // Cadre Card User:

  let frameCardUser = createTag('div')
  addClass(frameCardUser, ['frameCardUser'])
  //postAndComment.setAttribute('id', 'postAndComment_' + post[i].id)

  // Frame de la card:
  let divDisplayUser = createTag('div')
  addClass(divDisplayUser, ['display-frameCard__displayUser', 'shadow', 'rounded'])
  divDisplayUser.setAttribute('id', 'divDisplayUser')
  //divDisplayUser.setAttribute('id', 'divDisplayUser_' + post[i].id)
  //divDisplayUser.setAttribute('data-divDisplayUser', post[i].id)

  // Injecte dans le html:
  divCol.appendChild(frameCardUser)
  frameCardUser.appendChild(divDisplayUser)

  //---------------------------------------------------------
  // Intérieur frame de la card:

  let frameUsernameUser = createTag('div')
  addClass(frameUsernameUser, ['frameUsernameUser'])

  let frameInfoUser = createTag('div')
  addClass(frameInfoUser, ['frameInfoUser'])

  let frameButton = createTag('div')
  addClass(frameButton, ['frameButton'])

  // Injecte dans le html:
  divDisplayUser.appendChild(frameUsernameUser)
  divDisplayUser.appendChild(frameInfoUser)
  divDisplayUser.appendChild(frameButton)

  //---------------------------------------------------------
  // Intérieur des frames de la card:

  // Username:
  let usernameUser = createTag('h2')
  addClass(usernameUser, ['usernameUser'])
  usernameUser.innerHTML = user.username

  console.log(user)

  /*const getUsename= user.find(user => user.id === 0/*idView*).username*/
  //console.log(getUsename)

  // Injecte dans le html:
  // Username:
 frameUsernameUser.appendChild(usernameUser)

  // Infos user:
  let emailUser = createTag('p')
  addClass(emailUser, ['emailUser'])
  emailUser.innerHTML = 'Adresse mail : </br>' + user.email

  let bioUser = createTag('p')
  addClass(bioUser, ['bioUser', 'text-white'])
  bioUser.innerHTML = user.bio

  // Injecte dans le html:
  // Infos user:
  frameInfoUser.appendChild(emailUser)
  // Infos user:
  frameInfoUser.appendChild(bioUser)

  //---------------------------------------------------------
  // Button:

  // Bouton modifier le user:
  let linkEditUser = createTag('a')
    addClass(linkEditUser, ['button'])
    linkEditUser.setAttribute('id', 'linkEditUser_' + user.id)
    linkEditUser.setAttribute('type', 'button')
    linkEditUser.setAttribute("href", "../html/editProfil.html?id=" + user.id)
    linkEditUser.setAttribute('data-editComment', user.id)
    linkEditUser.innerHTML = 'Modifier'

  // Icone du le bouton modifier:
  let iconeModifyUser = createTag('i')
  addClass(iconeModifyUser, ['far', 'fa-edit'])

  // Bouton retour:
  let linkReturnUser = createTag('a')
  addClass(linkReturnUser, ['button'])
  linkReturnUser.setAttribute('id', 'linkReturnUser')
  linkReturnUser.setAttribute('type', 'button')
  linkReturnUser.setAttribute("href", "../html/postWall.html")

  //linkReturnUser.setAttribute('data-lookComment', post[i].id)
  //linkReturnUser.setAttribute("href", "../html/comment.html?id=" + post[i].id)
  linkReturnUser.innerHTML = 'Retour'

  // Icone du bouton retour:
  let iconeReturnUser = createTag('i')
  addClass(iconeReturnUser, ['fas', 'fa-undo'])

  // Injecte dans le html:

  // Bouton modifier le user::
  frameButton.appendChild(linkEditUser)
  linkEditUser.appendChild(iconeModifyUser)

  // Bouton retour:
  frameButton.appendChild(linkReturnUser)
  linkReturnUser.appendChild(iconeReturnUser)




}

///////////////////////////////////////////////////////////

