///////////////////////////////////////////////////////////
// viewComment.js: ////////////////////////////////////////
///////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////
// Récuére l'id et la concaténe avec l'ulr comment;


//---------------------------------------------------------
// Récupére l'id dans l'url:
const getIdEditCommentOfPostUrl = window.location.search

//---------------------------------------------------------
// Purge getIdUrl de ?id= et recupere  l'id :

// Analyser les paramètres de la chaîne de requête:
const getUrlParams = new URLSearchParams(getIdEditCommentOfPostUrl);
//console.log(getUrlParams)

// Recupére l'id du post:
const getIdPost = parseInt(getUrlParams.get('id'))
console.log('id du post:')
console.log(getIdPost)

//---------------------------------------------------------
// Url de comments:

const urlComment = "http://localhost:3000/api/comments/post/" + getIdPost;

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

async function connectComment(urlComment) {

  //console.log(urlComment)
  let xhr = new XMLHttpRequest()
  //console.log(xhr)

  xhr.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {

      var comment = JSON.parse(this.responseText)
      //console.log('comment l35 comment:')
      //console.log(comment)

      comment.reverse()

      displayAllCommentOfPost(comment)
      displayUsername(comment)

    } else if (this.readyState == XMLHttpRequest.DONE && this.status == 500) {
      console.log("Erreur 500")
    }
  }
  xhr.open("GET", urlComment, true)
  xhr.setRequestHeader("Authorization", "Bearer " + tokenConnect)
  xhr.send()
}
connectComment(urlComment)


///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
// Affiche tous les comentaire du post: OK


function displayAllCommentOfPost(comment) {
  //console.log(comment)
  for (let i = 0; i < comment.length; i++) {

    let commentLength = comment.length
    sessionStorage.setItem("commentLength", commentLength)

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
    // Cadre de la card qui affiche les posts et comments:

    // Card:
    let commentOfPost = createTag('div') // postAndComment
    addClass(commentOfPost, ['postAndComment'])
    commentOfPost.setAttribute('id', 'postAndComment_' + comment[i].id)

    // Frame de la card:
    let divReadComment = createTag('div') // divReadPost
    addClass(divReadComment, ['display-frameCard__read-post', 'shadow', 'rounded'])
    //divReadComment.setAttribute('id', 'divReadPost')
    divReadComment.setAttribute('id', 'divReadPost_' + comment[i].id)
    divReadComment.setAttribute('data-divReadPost', comment[i].id)


    // Injecte dans le html:
    divCol.appendChild(commentOfPost)
    commentOfPost.appendChild(divReadComment)

    //---------------------------------------------------------
    // Intérieur de la card:

    // H2 Cadre Username:
    let divDisplayUsername = createTag('div')
    addClass(divDisplayUsername, ['display-frameCard__username'])

    //Username:
    let divUsername = createTag('h2')
    divUsername.setAttribute("id", "username_" + comment[i].id)
    divUsername.setAttribute('data-idUsername', comment[i].userId) //comment[i].id
    console.log(divUsername)

    // Cadre du displayPost:
    let divDisplayPost = createTag('div')
    addClass(divDisplayPost, ['display-frameCard__displayPost', 'shadow', 'rounded'])
    divDisplayPost.setAttribute('id', 'displayPost_' + comment[i].id)

    // Affichage du post:
    let divPost = createTag('p')
    divPost.innerHTML = comment[i].content

    // Injecte dans le html:
    divReadComment.appendChild(divDisplayUsername)
    divDisplayUsername.appendChild(divUsername)
    divReadComment.appendChild(divDisplayPost)
    divDisplayPost.appendChild(divPost)



    //---------------------------------------------------------
    // PLacement de la date du publication du post:

    // Cadre de la date:
    let divInfoDate = createTag('div')
    addClass(divInfoDate, ['display-frameCard__infoPost'])
    //iconModifyPost.setAttribute('id', 'infoDate_' + comment[i].id)
    divInfoDate.setAttribute('data-idInfoDate', comment[i].id)


    // Convertit la date:
    let convertsDate = new Date(comment[i].createdAt);
    let dateFormat = (convertsDate.toLocaleString())

    // Date de publication:
    let pDate = createTag('p')
    pDate.setAttribute('id', 'pDate_' + comment[i].id)
    pDate.setAttribute('data-pDate', comment[i].id)
    pDate.innerHTML = dateFormat

    // Injecte dans le html:
    divReadComment.appendChild(divInfoDate)
    divInfoDate.appendChild(pDate)

  }

}


///////////////////////////////////////////////////////////
// Affiche le username du comment: a voir si valide quand auth en place


function displayUsername(comment) {

  console.log(comment)

  for (let i = 0; i < comment.length; i++) {

    //Sélectionne le h2 du comment correspondant:
    let hUsername = document.getElementById('username_' + comment[i].id)
    console.log(hUsername)

    // Récupe l'userId et l'ajoute a l'url des user:
    let findUrlUser = 'http://localhost:3000/api/users/' + comment[i].userId
    console.log(findUrlUser)

    fetch(findUrlUser)
      .then(response => response.json())
      .then(data => {

        hUsername.innerHTML = data.username

      })

  }

}
displayUsername()

///////////////////////////////////////////////////////////
