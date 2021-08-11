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
      post.reverse()

      for (var i = 0; i < post.length; i++) {
        var postId = post[i].id
        var postContent = post[i].content
        var userId = post[i].userId
      }
      displayFormPost(userId)
      displayAllPosts(post, postId, postContent)

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
    displayAllPosts(userUsername)
    //displayAll(result)
  } else if (this.readyState == XMLHttpRequest.DONE && this.status == 500) {
    console.log("Erreur 500")
  }
}
xhr.open("GET", urlUser, true)
xhr.send()
}
connectUser(urlUser)


///////////////////////////////////////////////////////////
// Affiche l'input envoyer et envoie les posts:

function displayFormPost (userId) {
  //console.log(userId)

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
      displayAllPosts (divCol)

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
      addClass(textareaPost, ['shadow','rounded'])
      textareaPost.setAttribute('id','inputPost')
      textareaPost.setAttribute('name','post')
      textareaPost.setAttribute('type','text')
      textareaPost.setAttribute('id','inputPost')
      textareaPost.setAttribute('rows','2')
      textareaPost.setAttribute('placeholder','Un petit mot ?')
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
      divSendPost   .appendChild(postForm)
      postForm      .appendChild(divInputPost)
      divInputPost  .appendChild(textareaPost)
      postForm      .appendChild(divBtnPost)
      divBtnPost    .appendChild(btnPost)
      btnPost       .appendChild(iconPost)

      //---------------------------------------------------------
      // Envoie le Post:

      btnPost.addEventListener('click', (event) => {
        event.preventDefault();
        console.log(btnPost)
        console.log(event)

        const urlSendPost = "http://localhost:3000/api/posts"

        let formData = {
          userId: userId,
          content: document.getElementById('inputPost').value
        }

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
//displayFormPost ()

function ess (divCol) {
console.log(divCol)
}

///////////////////////////////////////////////////////////
// Affiche tous les posts:

function displayAllPosts (post, postId, postContent, userUsername, divCol){
  console.log(divCol)
  console.log(postId)
  console.log(postContent)
  console.log(post)

  for (var i = 0; i < post.length; i++) {

    //---------------------------------------------------------
    // Card qui affiche les posts et comments:

    // Card:
    let postAndComment = createTag('div')
    addClass(postAndComment, ['postAndComment'])
    postAndComment.setAttribute('id','postAndComment_' + postId)

    // Frame de la card:
    let divReadPost = createTag('div')
    addClass(divReadPost, ['display-frameCard__read-post', 'shadow', 'rounded'])

    // Injecte dans le html:
    divCol   .appendChild(postAndComment)
    postAndComment.appendChild(divReadPost)

    //---------------------------------------------------------
    // Intérieur de la card:

    // Cadre Username:
    let divDisplayUsername = createTag('div')
    addClass(divDisplayUsername, ['display-frameCard__username'])

    //Username:
    let divUsername = createTag('h2')
    divUsername.innerHTML = userUsername

  }
}
