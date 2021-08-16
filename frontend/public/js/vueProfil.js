///////////////////////////////////////////////////////////
// vueProfil.js: ///////////////////////////////////////////
///////////////////////////////////////////////////////////


// 1) ////////////////////////////////////////////////////////
// Récupére l'id de l'url avec la propriété .search de window.location:
const getIdUrl = window.location.search;
console.log(getIdUrl)
// réponse : ?id=XXXXXXXX


// 2) /////////////////////////////////////////////////////////
// Purge getIdUrl de ?id= et recupere uniquement l'id avec la méthode getUrlParams:

// Analyser les paramètres de la chaîne de requête:
//const getUrlParams = new URLSearchParams(getIdUrl);

// retournera la première valeur associée au paramètre de recherche donné:
//const getId = getUrlParams.get('id')
//console.log(getId)
// réponse : xxxxxxxxx


// 3) /////////////////////////////////////////////////////////
// Fonction qui concaténe l'url de l'API avec l'id récupéré et filtré
//function assemblyId(getId) {
    //console.log(getId);
    //réponse : 5beaaa8f1c9d440000a57d95

    // Déclaration des variables:
    //const url = "http://localhost:3000/api/teddies";
    //const urlProduct = url + "/" + getId;
    //console.log(urlProduct)
    // reponse http://localhost:3000/api/teddies/5beaaa8f1c9d440000a57d95

    //connect2(urlProduct);
//}
//assemblyId(getId);
///////////////////////////////////////////////////////////
// Connexion et récupération:


//---------------------------------------------------------
// Users:

// Url pour recupérer les posts:
const urlUser = 'http://localhost:3000/api/users'

// Fonction qui récupére les posts:
async function connectUser(urlUser) {

  let xhr = new XMLHttpRequest()

  xhr.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
      //xhr.setRequestHeader("Authorization", "Bearer {token}");
      var user = JSON.parse(this.responseText)
      //console.log(post)

      displayUser(user)

      /*for (var i = 0; i < post.length; i++){
        var userId = post[i].userId
      }
      sessionStorage.setItem("userId", userId)*/


    } else if (this.readyState == XMLHttpRequest.DONE && this.status == 500) {
      console.log("Erreur 500")
    }
  }
  xhr.open("GET", urlUser, true)
  xhr.send()
}
connectUser(urlUser)

///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
// Affiche de l'user:

function displayUser(user) {


  //---------------------------------------------------------
  // Création des éléments de base enfants:

  //Selectionne l'id parent:
  let main = document.querySelector('main')

  // Container:
  let divContainerUser = createTag('div') //
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
  usernameUser.innerHTML = //user.username

  console.log(user)
  //const getUsename= user.find(user => user.id === 0/*idView*/).username
  //console.log(getUsename)

  // Injecte dans le html:
  // Username:
  frameUsernameUser.appendChild(usernameUser)

  // Infos user:
  let emailUser = createTag('p')
  addClass(emailUser, ['emailUser'])
  emailUser.innerHTML = 'Adresse mail : </br>'//user.email

  let bioUser = createTag('p')
  addClass(bioUser, ['bioUser', 'text-white'])
  bioUser.innerHTML = //user.bio

  // Injecte dans le html:
  // Infos user:
  frameInfoUser.appendChild(emailUser)
  // Infos user:
  frameInfoUser.appendChild(bioUser)

  //---------------------------------------------------------
  // Button:

  // Bouton modifier le user:
  let btnModifyUser = createTag('button')
  addClass(btnModifyUser, ['display-frameCard__btnModifyUser', 'shadow', 'rounded'])
  btnModifyUser.setAttribute('id', 'btnModifyUser')
  btnModifyUser.setAttribute('type', 'button')
  //btnModifyUser.setAttribute('data-lookComment', post[i].id)
  //btnModifyUser.setAttribute("href", "../html/comment.html?id=" + post[i].id)
  btnModifyUser.innerHTML = 'Modifier'

  // Icone du le bouton modifier:
  let iconeModifyUser = createTag('i')
  addClass(iconeModifyUser, ['far', 'fa-edit'])

  // Bouton retour:
  let btnReturnUser = createTag('button')
  addClass(btnReturnUser, ['display-frameCard__btnReturnUser', 'shadow', 'rounded'])
  btnReturnUser.setAttribute('id', 'btnReturnUser')
  btnReturnUser.setAttribute('type', 'button')
  //btnReturnUser.setAttribute('data-lookComment', post[i].id)
  //btnReturnUser.setAttribute("href", "../html/comment.html?id=" + post[i].id)
  btnReturnUser.innerHTML = 'Retour'

  // Icone du bouton retour:
  let iconeReturnUser = createTag('i')
  addClass(iconeReturnUser, ['fas', 'fa-undo'])

  // Injecte dans le html:

  // Bouton modifier le user::
  frameButton.appendChild(btnModifyUser)
  btnModifyUser.appendChild(iconeModifyUser)

  // Bouton retour:
  frameButton.appendChild(btnReturnUser)
  btnReturnUser.appendChild(iconeReturnUser)

  //---------------------------------------------------------
  // fonction des boutonss:

  //---------------------------------------------------------
  // Modifier:
  btnModifyUser.addEventListener('click', (event) => {
    console.log(event)
  })

  //---------------------------------------------------------
  // Retour:
  btnReturnUser.addEventListener('click', (event) => {
    window.location =  '../html/postWall.html'
  })



}
