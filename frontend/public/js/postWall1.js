///////////////////////////////////////////////////////////
// PostWall.js: ///////////////////////////////////////////
///////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////
// Connexion :

// Url pour recupérer les post:
const url = 'http://localhost:3000/api/posts'


async function connect(url) {

    let xhr = new XMLHttpRequest()

    xhr.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            //xhr.setRequestHeader("Authorization", "Bearer {token}");
            var result = JSON.parse(this.responseText)


            result.reverse()

            displayAll(result)

        } else if (this.readyState == XMLHttpRequest.DONE && this.status == 500) {
            console.log("Erreur 500")
        }
    }

    xhr.open("GET", url, true)
    xhr.send()
}
connect(url)

///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
// Post:

function displayAll(result) {

    /*
    //Selectionne l'id parent:
    let main = document.querySelector('main')

    //---------------------------------------------------------
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

    //---------------------------------------------------------
    // Card Post:

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

    */
    ///////////////////////////////////////////////////////////
    // Envoie le post:
    /*
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
    */

    ///////////////////////////////////////////////////////////
    /*
    // Icone Post:
    let spanIconPost = createTag('span')
    addClass(spanIconPost, 'fas')
    addClass(spanIconPost, 'fa-paper-plane')
    addClass(spanIconPost, 'p-2')

    ///////////////////////////////////////////////////////////
    // Injecte dans le html:

    // Ajout des élément de base:
    main.appendChild(divContainer)

    divContainer.appendChild(divRow)
    divRow.appendChild(divCol)

    //---------------------------------------------------------
    // Card Post:

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
    */
    ///////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////
    // Affiche les posts:
    for (var i = 0; i < result.length; i++) {

        //---------------------------------------------------------
        // Card qui affiche les posts:

    /*      let divPostAndComment = createTag('div')
        addClass(divPostAndComment, 'divPostAndComment')

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

        // Id de l'user
        let findUrlUser = 'http://localhost:3000/api/users/' + result[i].userId

        ///////////////////////////////////////////////////////////
        // Recuperation du username de l'user::

        let xhr = new XMLHttpRequest()

        xhr.onreadystatechange = function () {

            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {

                var getUser = JSON.parse(this.responseText)

                h2User.innerHTML = getUser.username

            } else if (this.readyState == XMLHttpRequest.DONE && this.status == 500) {

                console.log("Erreur 500")
            }
        }

        xhr.open("GET", findUrlUser, true)

        xhr.send()
    */
        ///////////////////////////////////////////////////////////

    /*    // Card read Post displayPost: **********************************
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
        let iconModifyPost = createTag('i')//
        addClass(iconModifyPost, 'fas')//
        addClass(iconModifyPost, 'fa-reply')//
        iconModifyPost.setAttribute('id', 'iconModify')//
        iconModifyPost.setAttribute("data-idModifyPost", result[i].id)//
        const getIdModify = ("data-idModifyPost", result[i].id)//
    */
        ///////////////////////////////////////////////////////////
        // Modify Post:

        //---------------------------------------------------------
        // Ecoute le bouton modify ( la fleche retourné ):
    /*        iconModifyPost.addEventListener('click', (event) => {

            //---------------------------------------------------------
            // Cache le post pour introduire le input pour update le post:
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

                ///////////////////////////////////////////////////////////
                // Fonction Modify Post:

                //---------------------------------------------------------
                // Recupere l'id du post et l'ajoute a l'url updatePost:
                let idModify = getIdModify
                let getModify = document.getElementById('post_' + idModify)

                function getUrlModify() {

                    const url = "http://localhost:3000/api/posts/" + idModify
                    return url
                }

                //---------------------------------------------------------
                // Recupere la modification du post:
                function modifyFormData() {
                    for (var i = 0; i < result.length; i++) {
                        let formData = {
                            id: idModify,
                            content: document.getElementById('modifyPost').value
                        }
                        return formData
                    }
                }

                var myInit = {
                    method: "PUT",
                    headers: new Headers({
                        "Content-Type": "application/json;charset=UTF-8"
                    }),
                    body: JSON.stringify(modifyFormData()),
                    mode: 'cors',
                    cache: 'default'
                };

                fetch(getUrlModify(), myInit)
                    .then(response => response.json())
                    //.then(res => document.location.reload())
                    .catch(err => console.log(err))

            })


                // Rajout de l'icone au bouton  dans la version amélioré:
                // Icon:
                let iconSendModifyPost = createTag('i')
                addClass(iconSendModifyPost, 'far')
                addClass(iconSendModifyPost, 'fa-paper-plane')
                iconSendModifyPost.setAttribute('id', 'iconSendModifyPost')
                //iconSendModifyPost.setAttribute("data-idSendModifyPost", result[i].id)
    */

    /*        let btnReturnReadPost = createTag('button')
            addClass(btnReturnReadPost, 'btn--sendPostModify')
            addClass(btnReturnReadPost, 'shadow')
            addClass(btnReturnReadPost, 'rounded')
            addClass(btnReturnReadPost, 'my-3')
            btnReturnReadPost.setAttribute('id', 'btnReturnReadPost')
            btnReturnReadPost.setAttribute('type', 'button')
            btnReturnReadPost.innerHTML = 'Retour'

            ///////////////////////////////////////////////////////////
            // Retour aux posts:

            //---------------------------------------------------------
            // Ecoute le bouton retour:
            btnReturnReadPost.addEventListener('click', (event) => {

                document.location.reload()
            })

            divCardRead.appendChild(formModify)
            formModify.appendChild(frameTextereaModifyPost)
            frameTextereaModifyPost.appendChild(textareaModyfyPost)
            frameTextereaModifyPost.appendChild(divBtnSendPostModify)
            //divBtnSendPostModify.appendChild(iconSendModifyPost)
            frameTextereaModifyPost.appendChild(btnReturnReadPost)
    */
        })

        ///////////////////////////////////////////////////////////////////////
/*
        let iconDeletePost = createTag('i')
        addClass(iconDeletePost, 'fas')
        addClass(iconDeletePost, 'fa-times-circle"')
        iconDeletePost.setAttribute('id', 'iconDeletePost')
        iconDeletePost.setAttribute("data-idDeletePost", result[i].id)


        ///////////////////////////////////////////////////////////////////////
        // Delete:

        //---------------------------------------------------------
        // Ecoute le bouton delete ( la petite croix ):
        iconDeletePost.addEventListener('click', (event) => {
            event.preventDefault();
            stopPropagation();

            console.log(iconDeletePost)
            console.log(event)

            ///////////////////////////////////////////////////////////
            // Fonction DELETE Post:

            //---------------------------------------------------------
            // Recupere l'id du post et l'ajoute a l'url deletePost:

            let idDelete = event.target.getAttribute('data-idDeletePost')

            let getDelete = document.getElementById('post_' + idDelete)

            function getUrlDelete() {
                for (var i = 0; i < result.length; i++) {
                    const url = "http://localhost:3000/api/posts/" + idDelete
                    return url
                }
            }
            getUrlDelete()

            //---------------------------------------------------------
            // Supprime le post coté front:
            getDelete.remove(idDelete)

            //---------------------------------------------------------
            // Supprime le post coté back:
            var myInit = {
                method: "DELETE"
            };

            fetch(getUrlDelete(), myInit)
                .then(res => res.text()) // or res.json()
                .then(res => console.log(res))
                .then(res => document.location.reload())

        })
*/
        ///////////////////////////////////////////////////////////

        ///////////////////////////////////////////////////////////
        // Zone avec le bouton comment et la date:

        // card-read-post__option"
        let divPostOption = createTag('div')
        addClass(divPostOption, 'card-read-post__option')
        divPostOption.setAttribute('id', 'divPostOption')

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
        const getIdPost = ("data-createComment", result[i].id)


        ///////////////////////////////////////////////////////////
        // Création du comment:

        //---------------------------------------------------------
        // Ecoute le bouton comment :
        buttonCreateComment.addEventListener('click', (event) => {
            console.log(event)
            console.log(result)

            //---------------------------------------------------------
            // Cache le post pour introduire le input pour update le post:
            divCardReadPostDisplayPost.style.display = 'none'
            divPostOption.style.display = 'none'

            let formSendComment = createTag('form')
            addClass(formSendComment, 'd-flex')
            addClass(formSendComment, 'flex-column')
            addClass(formSendComment, 'justify-content-around')
            addClass(formSendComment, 'postForm')

            let frameTextereaSendComment = createTag('div')
            addClass(frameTextereaSendComment, 'frameTextereaModifyPost')
            addClass(frameTextereaSendComment, 'input-field')


            let textareaSendComment = createTag('textarea')
            addClass(textareaSendComment, 'form-control')
            addClass(textareaSendComment, 'input-lg')
            addClass(textareaSendComment, 'p-text-area')
            addClass(textareaSendComment, 'shadow')
            addClass(textareaSendComment, 'rounded')
            textareaSendComment.setAttribute('id', 'sendComment')
            textareaSendComment.setAttribute('name', 'comment')
            textareaSendComment.setAttribute('type', 'text')
            textareaSendComment.setAttribute('rows', '2')
            textareaSendComment.setAttribute('placeholder', 'Un commentaire peut être ? ?')

            // Btn:
            let divBtnSendComment = createTag('button')
            addClass(divBtnSendComment, 'btn--SendComment')
            addClass(divBtnSendComment, 'shadow')
            addClass(divBtnSendComment, 'rounded')
            addClass(divBtnSendComment, 'mt-3')
            divBtnSendComment.setAttribute('id', 'btnSendComment')
            divBtnSendComment.setAttribute('type', 'button')
            divBtnSendComment.innerHTML = 'Envoyer'

            //---------------------------------------------------------
            // Ecoute le bouton envoyer:
            divBtnSendComment.addEventListener('click', (event) => {

                ///////////////////////////////////////////////////////////
                // Fonction Send Comment:

                event.preventDefault();
                console.log(divBtnSendComment)
                console.log(event)

                const url = "http://localhost:3000/api/comments"

                //---------------------------------------------------------
                // Recupere l'id du post:
                let idPost = getIdPost
                console.log(idPost)

                //---------------------------------------------------------
                // Creer l'objet du post:
                function createFormData() {
                    for (var i = 0; i < result.length; i++) {
                        let formData = {
                            userId: result[i].userId,
                            postId: idPost,
                            content: document.getElementById('sendComment').value
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
                    //.then(res => window.location.reload())
                    .then(() => {

                        ///////////////////////////////////////////////////////////
                        // Affiche les comment:

                        // Url pour recupérer les comments:
                        const url = 'http://localhost:3000/api/comments'

                        async function connect(url) {

                            let xhr = new XMLHttpRequest()

                            xhr.onreadystatechange = function () {
                                if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                                    var resultComment = JSON.parse(this.responseText)
                                    console.log(resultComment)
                                    resultComment.reverse()

                                    displayAllComments(resultComment)

                                } else if (this.readyState == XMLHttpRequest.DONE && this.status == 500) {
                                    console.log("Erreur 500")
                                }
                            }

                            xhr.open("GET", url, true)
                            xhr.send()
                        }
                        connect(url)

                        ///////////////////////////////////////////////////////////

                        ///////////////////////////////////////////////////////////
                        // Comments:

                        function displayAllComments(resultComment) {


                            divCardReadPostDisplayPost.style.display = 'block'
                            divPostOption.style.display = 'block'
                            textareaSendComment.style.display = 'none'
                            divBtnSendComment.style.display = 'none'



                            //Selectionne l'id parent:
                            let mainComment = document.getElementById('divPostOption')
                            console.log(mainComment)

                            let essdiv = createTag('div')
                            addClass(essdiv, 'essdiv')

                            let displayComment = createTag('div')
                            addClass(displayComment, 'displayComment')
                            addClass(displayComment, 'shadow')
                            addClass(displayComment, 'rounded')

                            ///////////////////////////////////////////////////////////
                            // Affiche les comments:

                            function getResultComment() {

                                for (var i = 0; i < resultComment.length; i++) {
                                    let getUserIdComment = resultComment[i].userId
                                    let getIdPost = resultComment[i].id
                                    let getContentComment = resultComment[i].content

                                    return getUserIdComment, getIdPost, getContentComment
                                }

                            }getResultComment()

                                // Frame card read post:
                                let divFrameCardReadComment = createTag('div')
                                addClass(divFrameCardReadComment, 'frameCard')
                                addClass(divFrameCardReadComment, 'd-flex')
                                addClass(divFrameCardReadComment, 'justify-content-center')
                                divFrameCardReadPost.setAttribute("id", "post_" + resultComment[i].id)

                                // Card read post:
                                let divCardReadComment = createTag('div')
                                addClass(divCardReadComment, 'card-read-post')
                                addClass(divCardReadComment, 'shadow')
                                addClass(divCardRead, 'rounded')

                                // Card read Post username:
                                let divCardReadCommentUsername = createTag('div')
                                addClass(divCardReadCommentUsername, 'card-read-post__username')

                                // Nom de l'user:
                                let h2UseComment = createTag('h2')

                                // Id de l'user
                                let findUrlUserComment = 'http://localhost:3000/api/users/' + resultComment[i].userId
                                console.log(findUrlUserComment)

                                ///////////////////////////////////////////////////////////
                                // Recuperation du username de l'user qui comment:

                                let xhr = new XMLHttpRequest()

                                xhr.onreadystatechange = function () {

                                    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {

                                        var getUserComment = JSON.parse(this.responseText)
                                        console.log(getUserComment.username)

                                        h2UseComment.innerHTML = getUserComment.username

                                    } else if (this.readyState == XMLHttpRequest.DONE && this.status == 500) {

                                        console.log("Erreur 500")
                                    }
                                }

                                xhr.open("GET", findUrlUserComment, true)

                                xhr.send()

                                ///////////////////////////////////////////////////////////

                                // Card read Post displayPost: **********************************
                                let divCardReadPostDisplayComment = createTag('div')
                                addClass(divCardReadPostDisplayComment, 'card-read-post__displayPost')
                                addClass(divCardReadPostDisplayComment, 'shadow')
                                addClass(divCardReadPostDisplayComment, 'rounded')
                                addClass(divCardReadPostDisplayComment, 'text-white')
                                divCardReadPostDisplayPost.setAttribute('id', 'displayPost')

                                // Post:
                                let pComment = createTag('p')
                                pComment.innerHTML = resultComment[i].content
                                console.log(pComment)

                                // Icon modifyPost
                                let spanIconModifyPost = createTag('span')
                                addClass(spanIconModifyPost, 'card-read-post__iconModifyComment')

                                // Icon:
                                let iconModifyPost = createTag('i')
                                addClass(iconModifyPost, 'fas')
                                addClass(iconModifyPost, 'fa-reply')
                                iconModifyPost.setAttribute('id', 'iconModifyComment')
                                iconModifyPost.setAttribute("data-idModifyComment", resultComment[i].id)
                                const getIdModify = ("data-idModifyComment", resultComment[i].id)


                                divFrameCardReadPost.appendChild(essdiv)
                                essdiv.appendChild(h2UseComment)
                                essdiv.appendChild(displayComment)
                                displayComment.appendChild(pComment)
                                //.appendChild()
                                //.appendChild()
                                //.appendChild()
                                //.appendChild()
                                //.appendChild()
                                //.appendChild()
                                //.appendChild()



                        }

                    })

                //.then(res => window.location.reload())

            })


            divCardRead.appendChild(formSendComment)
            formSendComment.appendChild(frameTextereaSendComment)
            frameTextereaSendComment.appendChild(textareaSendComment)
            frameTextereaSendComment.appendChild(divBtnSendComment)



        })
        ///////////////////////////////////////////////////////////








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

        // Frame card read post:                         //divPostAndComment
       // divCol.appendChild(divFrameCardReadPost)
       divCol.appendChild(divPostAndComment)         // divCol.appendChild(divPostAndComment)

        // divPostAndComment                              // Frame card read post:
        divPostAndComment.appendChild(divFrameCardReadPost)                                             // divPostAndComment.appendChild(divFrameCardReadPost)
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

        // date:
        divOptionDate.appendChild(pDate)
    }

}
