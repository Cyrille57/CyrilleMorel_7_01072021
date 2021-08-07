///////////////////////////////////////////////////////////
// PostWall.js: ///////////////////////////////////////////
///////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////
// Connexion :

// Url pour recupérer les post:
const url = 'http://localhost:3000/api/posts'


async function connect(url) {

    // Creer un nouvel objet Ajax de type XMLHttpRequest:
    let xhr = new XMLHttpRequest()

    xhr.onreadystatechange = function () {
        // Détecte l'état de la requête:
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {

            // Envoie terminé, contenu récupéré et convertit en Json:
            var result = JSON.parse(this.responseText)
            console.log(result)
            result.reverse()
            //console.log(result)
            // Réponse: retourne le tableau avec les produits

            // envoie le result à la fonction display:
            displayAll(result)
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


function displayAll(result) {

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
    textarea.setAttribute('placeholder', 'Un petit mot ?')

    // Frame Btn
    let divFrameBtn = createTag('div')
    addClass(divFrameBtn, 'frameBtnSendPost')

    // Btn:
    let divBtnSendPost = createTag('button')
    addClass(divBtnSendPost, 'btn--sendPost')
    addClass(divBtnSendPost, 'shadow')
    addClass(divBtnSendPost, 'rounded')
    divBtnSendPost.setAttribute('id', 'btnSendPost')
    divBtnSendPost.setAttribute('type', 'button')
    divBtnSendPost.innerHTML = 'Post'


    ///////////////////////////////////////////////////////////////////////
    // Send Post:

    divBtnSendPost.addEventListener('click', (event) => {
        event.preventDefault();
        console.log(divBtnSendPost)
        console.log(event)

        const url = "http://localhost:3000/api/posts"

        function createFormData() {
            for (var i = 0; i < result.length; i++) {
                let formData = {
                    userId: result[i].userId,
                    content: document.getElementById('inputPost').value
                }

                console.log(formData)
                console.log(result[i].userId)
                console.log(('inputPost').value)
                return formData
            }
        }

        console.log(createFormData())
        var myInit = {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json;charset=UTF-8"
            }),
            body: JSON.stringify(createFormData()),
            mode: 'cors',
            cache: 'default'
        };

        fetch(url, myInit)
            .then(res => res.text()) // or res.json()
            .then(res => window.location.reload())


    })
    ///////////////////////////////////////////////////////////////////////



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
    divBtnSendPost.appendChild(spanIconPost)


    for (var i = 0; i < result.length; i++) {

        ////////////////////////////////////////////////////////////////////
        // Card ou apparais les posts:
        // Frame card read post:
        let divFrameCardReadPost = createTag('div')
        addClass(divFrameCardReadPost, 'frameCard')
        addClass(divFrameCardReadPost, 'd-flex')
        addClass(divFrameCardReadPost, 'justify-content-center')
        divFrameCardReadPost.setAttribute("id", "post_" + result[i].id)

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

        // Url d
        let findUrlUser = 'http://localhost:3000/api/users/' + result[i].userId
        console.log(findUrlUser)


        let xhr = new XMLHttpRequest()

        xhr.onreadystatechange = function () {

            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {

                var getUser = JSON.parse(this.responseText)
                console.log(getUser)

                h2User.innerHTML = getUser.username

            } else if (this.readyState == XMLHttpRequest.DONE && this.status == 500) {

                console.log("Erreur 500")
            }
        }

        // Ouvre la connexion en précisant la méthode:
        xhr.open("GET", findUrlUser, true)

        // Envoie la requête:
        xhr.send()

        // Card read Post displayPost: **********************************
        let divCardReadPostDisplayPost = createTag('div')
        addClass(divCardReadPostDisplayPost, 'card-read-post__displayPost')
        addClass(divCardReadPostDisplayPost, 'shadow')
        addClass(divCardReadPostDisplayPost, 'rounded')
        addClass(divCardReadPostDisplayPost, 'text-white')
        divCardReadPostDisplayPost.setAttribute('id', 'displayPost')

        // Post:
        let pPost = createTag('p')
        pPost.innerHTML = result[i].content

        // Icon modifyPost
        let spanIconModifyPost = createTag('span')
        addClass(spanIconModifyPost, 'card-read-post__iconModifyPost')

        // Icon:
        let iconModifyPost = createTag('i')
        addClass(iconModifyPost, 'fas')
        addClass(iconModifyPost, 'fa-reply')
        iconModifyPost.setAttribute('id', 'iconModify')
        iconModifyPost.setAttribute("data-idModifyPost", result[i].id)
        const getIdModify = ("data-idModifyPost", result[i].id)
        console.log(getIdModify)
        console.log(result[i].id)

        ///////////////////////////////////////////////////////////////////////
        // Modify Post:

        iconModifyPost.addEventListener('click', (event) => {
            //event.preventDefault();
            console.log(iconModifyPost)
            console.log(event)



            divCardReadPostDisplayPost.style.display = 'none'
            divPostOption.style.display = 'none'

            let formModify = createTag('form')
            addClass(formModify, 'd-flex')
            addClass(formModify, 'flex-column')
            addClass(formModify, 'justify-content-around')
            addClass(formModify, 'postForm')

            let frameTextereaModifyPost = createTag('div')
            addClass(frameTextereaModifyPost, 'frameTextereaModifyPost')
            addClass(frameTextereaModifyPost, 'input-field')


            let textareaModyfyPost = createTag('textarea')
            addClass(textareaModyfyPost, 'form-control')
            addClass(textareaModyfyPost, 'input-lg')
            addClass(textareaModyfyPost, 'p-text-area')
            addClass(textareaModyfyPost, 'shadow')
            addClass(textareaModyfyPost, 'rounded')
            textareaModyfyPost.setAttribute('id', 'modifyPost')
            textareaModyfyPost.setAttribute('name', 'post')
            textareaModyfyPost.setAttribute('type', 'text')
            textareaModyfyPost.setAttribute('rows', '2')
            textareaModyfyPost.setAttribute('placeholder', 'On efface et on recommence ?')

            // Btn:
            let divBtnSendPostModify = createTag('button')
            addClass(divBtnSendPostModify, 'btn--sendPostModify')
            addClass(divBtnSendPostModify, 'shadow')
            addClass(divBtnSendPostModify, 'rounded')
            addClass(divBtnSendPostModify, 'mt-3')
            divBtnSendPostModify.setAttribute('id', 'btnSendPostModify')
            divBtnSendPostModify.setAttribute('type', 'button')
            divBtnSendPostModify.innerHTML = 'Mettre à jour'

            divBtnSendPostModify.addEventListener('click', (event) => {

                //console.log(getIdModify)
                let idModify = getIdModify/////////////////////
                //console.log(idModify)
                let getModify = document.getElementById('post_' + idModify)
                //console.log(getModify)

                function getUrlModify() {
                    //for (var i = 0; i < result.length; i++) {

                        const url = "http://localhost:3000/api/posts/" + idModify
                        console.log(url)
                        return url
                    //}

                }
                //console.log(getUrlModify())

                function modifyFormData() {
                    for (var i = 0; i < result.length; i++) {
                        let formData = {
                            id: idModify,
                            content: document.getElementById('modifyPost').value
                        }
                        console.log(getIdModify)
                        console.log(formData)
                        return formData
                    }
                }


                    console.log(modifyFormData())
                var myInit = {
                    method: "PUT",
                    headers: new Headers({
                        "Content-Type": "application/json;charset=UTF-8"
                    }),
                    body: JSON.stringify(modifyFormData()),
                    mode: 'cors',
                    cache: 'default'
                };

                console.log(myInit)
                fetch(getUrlModify(), myInit)
                    .then(response => response.json())
                    .then(res => res.text()) // or res.json()
                    .then(res => window.location.reload())
                    .catch(err => console.log(err))




            })

        /*    // Icon:
            let iconSendModifyPost = createTag('i')
            addClass(iconSendModifyPost, 'far')
            addClass(iconSendModifyPost, 'fa-paper-plane')
            iconSendModifyPost.setAttribute('id', 'iconSendModifyPost')
            //iconSendModifyPost.setAttribute("data-idSendModifyPost", result[i].id)
        */

            let btnReturnReadPost = createTag('button')
            addClass(btnReturnReadPost, 'btn--sendPostModify')
            addClass(btnReturnReadPost, 'shadow')
            addClass(btnReturnReadPost, 'rounded')
            addClass(btnReturnReadPost, 'my-3')
            btnReturnReadPost.setAttribute('id', 'btnReturnReadPost')
            btnReturnReadPost.setAttribute('type', 'button')
            btnReturnReadPost.innerHTML = 'Retour'

            btnReturnReadPost.addEventListener('click', (event) => {

                document.location.reload()
            })

            divCardRead.appendChild(formModify)
            formModify.appendChild(frameTextereaModifyPost)
            frameTextereaModifyPost.appendChild(textareaModyfyPost)
            frameTextereaModifyPost.appendChild(divBtnSendPostModify)
            //divBtnSendPostModify.appendChild(iconSendModifyPost)
            frameTextereaModifyPost.appendChild(btnReturnReadPost)




        })


        ///////////////////////////////////////////////////////////////////////

        let iconDeletePost = createTag('i')
        addClass(iconDeletePost, 'fas')
        addClass(iconDeletePost, 'fa-times-circle"')
        iconDeletePost.setAttribute('id', 'iconDeletePost')
        iconDeletePost.setAttribute("data-idDeletePost", result[i].id)


        ///////////////////////////////////////////////////////////////////////
        // Delete:
        iconDeletePost.addEventListener('click', (event) => {
            event.preventDefault();
            console.log(iconDeletePost)
            console.log(event)


            let idDelete = event.target.getAttribute('data-idDeletePost')

            let getDelete = document.getElementById('post_' + idDelete)

            getDelete.remove(idDelete)

            function getUrlDelete() {
                for (var i = 0; i < result.length; i++) {

                    const url = "http://localhost:3000/api/posts/" + idDelete
                    console.log(url)
                    return url
                }

            }
            getUrlDelete()

            //console.log(url)
            var myInit = {
                method: "DELETE"
            };

            fetch(getUrlDelete(), myInit)
                .then(res => res.text()) // or res.json()
                .then(res => console.log(res))

            //location.reload()

        })
        ///////////////////////////////////////////////////////////////////////




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
        buttonCreateComment.innerHTML = "Comment"
        buttonCreateComment.setAttribute("data-createComment", result[i].id)

        // Icone createComment:
        let iconCreateComment = createTag('i')
        addClass(iconCreateComment, 'far')
        addClass(iconCreateComment, 'fa-comment')
        addClass(iconCreateComment, 'p-2')

        // card-read-post__date":
        let divOptionDate = createTag('div')
        addClass(divOptionDate, 'card-read-post__date')

        // date:
        let getDateCreate = result[i].createdAt
        let convertsDate = new Date(getDateCreate);
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

        //Icon Modify:
        spanIconModifyPost.appendChild(iconModifyPost)

        // Icon Delete:
        spanIconModifyPost.appendChild(iconDeletePost)

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


    btnSendPost.addEventListener('click', (event) => {
        event.preventDefault();
        console.log(event)



        for (var i = 0; i < result.length; i++) {
            console.log(result.length)

            let formData = {
                userId: result[i].userId,
                content: document.getElementById('inputPost').value
            }
            console.log(result[i].userId)
            console.log(formData)


        }

    })

}

function postSend() {

    let url = 'http://localhost:3000/api/posts'

    var myInit = {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json;charset=UTF-8"
        }),
        body: JSON.stringify(formData),
        mode: 'cors',
        cache: 'default'
    };

    fetch(url, myInit)
        .then(response => response.json())
        .then(json_object => {

            let getPost = json_object
            console.log(getPost)

            //window.location = "/frontend/public/html/postWall.html"
        })
        .catch((error) => {
            console.log(error)
        })
}


// pour mettre le pseudo dinamiquement exemple:
//newdiv.innerHTML = "<input type = 'text' placeholder ='ghi gyt' >";

// icone
//<span class="far fa-edit p-2"></span>
