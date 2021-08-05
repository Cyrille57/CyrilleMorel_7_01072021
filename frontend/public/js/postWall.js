///////////////////////////////////////////////////////////
// PostWall.js: ///////////////////////////////////////////
///////////////////////////////////////////////////////////


const url = 'http://localhost:3000/api/posts'




async function connect(url) {

    // Creer un nouvel objet Ajax de type XMLHttpRequest:
    let xhr = new XMLHttpRequest()

    xhr.onreadystatechange = function () {
        // Détecte l'état de la requête:
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {

            // Envoie terminé, contenu récupéré et convertit en Json:
            var result = JSON.parse(this.responseText)
            //console.log(result)
            // Réponse: retourne le tableau avec les produits

            // envoie le result à la fonction display:
            displayAll(result)
            getUrlUser (result)
            //findOne(result)

        } else if (this.readyState == XMLHttpRequest.DONE && this.status == 500) {
            // Si erreur 500 affiche dans console:
            console.log("Erreur 500")
        }
    }

    // Ouvre la connexion en précisant la méthode:
    xhr.open("GET", url, true)

    // Envoie la requête:
    xhr.send()
}
connect(url)


function getUrlUser(result){

    const urlGetUser = []
    for (var i = 0; i < result.length; i++) {

        let findUrlUser = 'http://localhost:3000/api/users/' + result[i].userId

        urlGetUser.push(findUrlUser)
        console.log(urlGetUser)
        displayAll(urlGetUser)

    }

}


function displayAll(result, urlGetUser) {


    //console.log(urlGetUser.length)
    //console.log(urlGetUser.length)
    //console.log(urlGetUser)

    //console.log(result.username)


    //Selectionne l'id parent:
    let main = document.querySelector('main')


    //////////////////////////////////////////////////////////
    // Création des éléments de base enfants:

    // Container:
    let divContainer = createTag('div') //
    addClass(divContainer, 'container')

    // Row:
    let divRow = createTag('div') //
    addClass(divRow, 'row')

    // Col-12
    let divCol = createTag('div') //
    addClass(divCol, 'col-12')

    // Frame card-send-post:
    let divFrameCardSendPost = createTag('div')
    addClass(divFrameCardSendPost, 'frameCard')
    addClass(divFrameCardSendPost, 'd-flex')
    addClass(divFrameCardSendPost, 'justify-content-center')

    // Card send post:
    let divCardSend = createTag('div')
    addClass(divCardSend, 'card-send-post')
    addClass(divCardSend, 'shadow')
    addClass(divCardSend, 'rounded')

    // Form card send:
    let formCardSend = createTag('form')
    addClass(formCardSend, 'd-flex')
    addClass(formCardSend, 'flex-column')
    addClass(formCardSend, 'justify-content-around')
    addClass(formCardSend, 'postForm')

    // Frame textarea:
    let divFrameTestarea = createTag('div')
    addClass(divFrameTestarea, 'd-flex')
    addClass(divFrameTestarea, 'justify-content-center')
    addClass(divFrameTestarea, 'input-field')

    // Textarea:
    let textarea = createTag('textarea')
    addClass(textarea, 'form-control')
    addClass(textarea, 'input-lg')
    addClass(textarea, 'p-text-area')
    addClass(textarea, 'shadow')
    addClass(textarea, 'rounded')
    textarea.setAttribute('id', 'inputPost')
    textarea.setAttribute('name', 'post')
    textarea.setAttribute('type', 'text')
    textarea.setAttribute('rows', '2')
    textarea.setAttribute('placeholder', 'Quoi de neuf')

    // Frame Btn
    let divFrameBtn = createTag('div')
    addClass(divFrameBtn, 'frameBtnSendPost')

    // Btn:
    let divBtnSendPost = createTag('button')
    addClass(divBtnSendPost, 'btn--sendPost')
    addClass(divBtnSendPost, 'shadow')
    addClass(divBtnSendPost, 'rounded')
    divBtnSendPost.setAttribute('type', 'button')
    divBtnSendPost.innerHTML = 'Post'

    // Icone Post:
    let spanIconPost = createTag('span')
    addClass(spanIconPost, 'fas')
    addClass(spanIconPost, 'fa-paper-plane')
    addClass(spanIconPost, 'p-2')

    //////////////////////////////////////////////////////////
    // Création des éléments de base enfants:

    // Ajout des élément de base:
    main.appendChild(divContainer)


    divContainer.appendChild(divRow)
    divRow.appendChild(divCol)


    // Frame card-send-post:
    divCol.appendChild(divFrameCardSendPost)

    // Card send post:
    divFrameCardSendPost.appendChild(divCardSend)

    // Form card send:
    divCardSend.appendChild(formCardSend)

    //Frame Texterarea:
    formCardSend.appendChild(divFrameTestarea)

    // Textarea:
    divFrameTestarea.appendChild(textarea)

    // Frame Btn:
    formCardSend.appendChild(divFrameBtn)

    // Btn:
    divFrameBtn.appendChild(divBtnSendPost)

    // icone Post:
    divBtnSendPost.appendChild( spanIconPost)


    for (var i = 0; i < result.length; i++) {



        /*
            let = createTag('')
            addClass(, '')
            .setAttribute('', '')


        */
            // Frame card read post:
            let divFrameCardReadPost = createTag('div')
            addClass(divFrameCardReadPost, 'frameCard')
            addClass(divFrameCardReadPost, 'd-flex')
            addClass(divFrameCardReadPost, 'justify-content-center')

            // Card read post:
            let divCardRead = createTag('div')
            addClass(divCardRead, 'card-read-post')
            addClass(divCardRead, 'shadow')
            addClass(divCardRead, 'rounded')

            // Card read Post username:
            let divCardReadPostUsername = createTag('div')
            addClass(divCardReadPostUsername, 'card-read-post__username')





            // Nom de l'user:
            let h2User = createTag('h2')
            h2User.innerHTML= result[i].username

            // Card read Post displayPost:
            let divCardReadPostDisplayPost = createTag('div')
            addClass(divCardReadPostDisplayPost, 'card-read-post__displayPost')
            addClass(divCardReadPostDisplayPost, 'shadow')
            addClass(divCardReadPostDisplayPost, 'rounded')
            addClass(divCardReadPostDisplayPost, 'text-white')

            // Post:
            let pPost = createTag('p')
            pPost.innerHTML = result[i].content

            // Icon modifyPost
            let spanIconModifyPost = createTag('span')
            addClass(spanIconModifyPost , 'card-read-post__iconModifyPost')

            // Icon:
            let iconModifyPost = createTag('i')
            addClass(iconModifyPost, 'fas')
            addClass(iconModifyPost, 'fa-bars')

            // card-read-post__option"
            let divPostOption = createTag('div')
            addClass(divPostOption, 'card-read-post__option')

            // card-read-post__createComment
            let divOptionCreateComment = createTag('div')
            addClass(divOptionCreateComment, 'card-read-post__createComment')

            // button createComment:
            let buttonCreateComment = createTag('button')
            addClass(buttonCreateComment, 'btn-sendComment')
            addClass(buttonCreateComment, 'shadow')
            addClass(buttonCreateComment, 'rounded')
            buttonCreateComment.setAttribute('type', 'button')
            buttonCreateComment.innerHTML= "Comment"

            // Icone createComment:
            let iconCreateComment= createTag('i')
            addClass(iconCreateComment ,'far')
            addClass(iconCreateComment ,'fa-comment')
            addClass(iconCreateComment ,'p-2')



            // card-read-post__date":
            let divOptionDate = createTag('div')
            addClass(divOptionDate, 'card-read-post__date')

            // date:
            let getDateCreate = result[i].createdAt
            let convertsDate= new Date(getDateCreate );
            let dateFormat = (convertsDate.toLocaleString())

            let pDate = createTag('p')
            pDate.innerHTML = dateFormat



            // Frame card read post:
            divCol.appendChild(divFrameCardReadPost)

            // Card read post:
            divFrameCardReadPost.appendChild(divCardRead)

            // Card read Post username:
            divCardRead.appendChild(divCardReadPostUsername)

            // Nom de l'user:
            divCardReadPostUsername.appendChild(h2User)

            // Card read Post displayPost:
            divCardRead.appendChild(divCardReadPostDisplayPost)

            // Post:
            divCardReadPostDisplayPost.appendChild(pPost)

            // Icon modifyPost:
            divCardReadPostDisplayPost.appendChild(spanIconModifyPost)

            //Icon:
            spanIconModifyPost.appendChild(iconModifyPost)

            // card-read-post__option":
            divCardRead.appendChild(divPostOption)

            // card-read-post__createComment
            divPostOption.appendChild(divOptionCreateComment)

            // button createComment:
            divOptionCreateComment.appendChild(buttonCreateComment)

            // card-read-post__date":
            divPostOption.appendChild(divOptionDate)

            //
            divOptionDate.appendChild(pDate)

            //divFrameCardReadPost.appendChild()

    }



}




// pour mettre le pseudo dinamiquement exemple:
//newdiv.innerHTML = "<input type = 'text' placeholder ='ghi gyt' >";

// icone
//<span class="far fa-edit p-2"></span>
